import { Context } from './Form';
import React from 'react';

interface IProps {
  children?: React.ReactElement;
  name: string;
  [key: string]: any;
}
function Field({
  children,
  name,
  getValues,
  setValues,
  registerField,
}: IProps) {
  const [, forceUpdate] = React.useState({});
  console.log('children', children.props);

  const getControll = (childProps) => {
    return {
      name,
      value: getValues(name),
      onChange: (...args) => {
        const event = args[0];
        let newValue;
        if (
          event &&
          event.target &&
          typeof event.target === 'object' &&
          'value' in event.target
        ) {
          newValue = (event.target as HTMLInputElement).value;
        } else {
          newValue = event;
        }
        setValues(name, newValue);
      },
      ...childProps,
    };
  };

  const returnChildNode = React.cloneElement(
    children,
    getControll(children.props)
  );

  const renderUpdate = () => {
    forceUpdate({});
  };
  const destory = registerField(name, renderUpdate);
  React.useEffect(() => {
    return () => {
      console.log('instance---destory----消');
      destory();
    };
  }, []);
  return returnChildNode;
}

const WrapField: React.FC<IProps> = (props) => {
  const context = React.useContext(Context);
  return <Field {...context} {...props} />;
};

export default WrapField;
