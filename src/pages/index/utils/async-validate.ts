function isEmptyValue(value) {
  if (value === undefined || value === null || value?.trim() === '') {
    return true;
  }
  return false;
}

const rules = {
  required: (rule, value, errors) => {
    // console.log('rule', rule);
    if (rule.required && (isEmptyValue(value) || !rule.field)) {
      errors.push(rule.message || `${rule.field} failure`);
    }
  },
};

const validators = {
  string: (rule, value, callback) => {
    const errors = [];
    const validate = rule.required;
    if (validate) {
      // if (isEmptyValue(value, 'string') && !rule.required) {
      //   return callback();
      // }
      rules.required(rule, value, errors);
      // if (!isEmptyValue(value, 'string')) {
      //   rules.type(rule, value, source, errors, options);
      //   rules.range(rule, value, source, errors, options);
      //   rules.pattern(rule, value, source, errors, options);
      //   if (rule.whitespace === true) {
      //     rules.whitespace(rule, value, source, errors, options);
      //   }
      // }
    }
    callback(errors);
  },
};

function asyncSerialArray(arr, func, callback) {
  const len = arr.length;
  let index = 0;
  const next = (err) => {
    if (err && err.length) {
      callback(err);
      return;
    }
    // 闭包拿正常的索引
    const originIndex = index;
    index = index + 1;
    if (originIndex < len) {
      func(arr[originIndex], next);
    } else {
      callback([]);
    }
    // total++
  };
  next([]);
}

function asyncParellArray(arr, func, callback) {
  const len = arr.length;
  let total = 0;
  let result = [];
  const next = (err) => {
    result = result.concat(err);
    total++;
    if (total === len) {
      callback(result);
    }
  };
  arr.forEach((rule) => {
    func(rule, next);
  });
}

function asyncMap(series, func, callback) {
  const keys = Object.keys(series);
  const keysLen = keys.length;
  let total = 0;
  let result = [];

  const pending = new Promise((resolve, reject) => {
    const next = (error) => {
      total++;
      result = result.concat(error);
      if (total === keysLen) {
        callback(result);
        return result.length ? reject(result) : resolve('');
      }
    };
    keys.forEach((key) => {
      // asyncSerialArray(series[key], func, next)
      asyncParellArray(series[key], func, next);
    });
  });
  pending.catch((e) => e);
  return pending;
}

class Schema {
  rules: Record<string, any>;
  // constructor(descriptor) {
  //   this.formateRules(descriptor);
  // }

  createRules(descriptor) {
    this.formateRules(descriptor);
  }

  formateRules(descriptor) {
    this.rules = {};
    for (const key in descriptor) {
      const rule = descriptor[key];
      this.rules[key] = Array.isArray(rule) ? rule : [rule];
    }
  }

  getValidationMethod(rule) {
    if (rule.validator) {
      return rule.validator;
    }
    return validators[this.getType(rule)] || false;
  }
  getType(rule) {
    return rule.type;
  }

  validate(source, callback) {
    const series = {};
    const keys = Object.keys(source);
    keys.forEach((key) => {
      const arrRule = this.rules[key];
      const value = source[key];
      arrRule.forEach((rule) => {
        series[key] = series[key] || [];
        rule.validator = this.getValidationMethod(rule);
        rule.field = key;
        rule.fullField = rule.fullField || key;
        series[key].push({
          rule,
          source,
          value,
          field: key,
        });
      });
    });

    return asyncMap(
      series,
      (data, doIt) => {
        const rule = data.rule;
        const value = data.value;
        const validator = rule.validator;

        function cb(e = []) {
          let errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (errors.length && rule.message !== undefined) {
            errors = [].concat(rule.message);
          }

          errors = errors.map((err) => ({
            message: err || 'error',
            field: data.field,
          }));
          doIt(errors);
        }

        const res = validator(rule, value, cb);
        if (res && res.then) {
          res.then(
            () => cb(),
            (e) => cb(e || `${rule.field} fails`)
          );
        } else {
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || `${rule.field} fails`);
          }
        }
      },
      (result) => {
        callback(result);
      }
    );
  }
}

function CreateSchema() {
  let instance;
  if (!instance) {
    instance = new Schema();
  }
  return (descriptor) => {
    instance.createRules(descriptor);
    return instance;
  };
}

export default CreateSchema();
