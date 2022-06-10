import React, { useEffect, useLayoutEffect } from 'react';
import './index.scss';

function pxToNumber(value: string | null): number {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}

function createTag(tagList) {
  let str = '';
  for (let i = 0; i < tagList.length; i++) {
    str += '<span class="text">' + tagList[i].label + '</span>';
  }
  return str;
}

const Tags = () => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [exceeded, setExceeded] = React.useState(false);
  const [tagList, setTagList] = React.useState([
    {
      label: 'dssaddsadsadasdsads',
      value: 1,
    },
    {
      label: 'dssaddsa',
      value: 1,
    },
    {
      label: 'dssaddsa',
      value: 1,
    },
    {
      label: 'dssaddsa',
      value: 1,
    },
    {
      label: 'dssaddsa',
      value: 1,
    },
    {
      label: 'dssaddsadsadasdsad',
      value: 1,
    },
    {
      label: 'dssaddsadsadasdsad',
      value: 1,
    },
    // {
    //   label: 'dssaddsadsadasdsadsadadssaddsadsadasdsadsada',
    //   value: 1,
    // },
  ]);

  function calcEllipsised() {
    const root = rootRef.current;
    if (!root) return;
    const originStyle = window.getComputedStyle(root);
    const container = document.createElement('div');
    const styleNames: string[] = Array.prototype.slice.apply(originStyle);
    styleNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });
    container.style.position = 'fixed';
    container.style.right = '9999px';
    container.style.top = '9999px';
    container.style.zIndex = '-1000';
    container.style.zIndex = '-10';
    container.style.height = 'auto';
    container.style.minHeight = 'auto';
    container.style.maxHeight = 'auto';
    container.style.textOverflow = 'clip';
    container.style.whiteSpace = 'normal';
    container.style.webkitLineClamp = 'unset';
    container.style.display = 'block';
    const rows = 2.5;
    container.innerHTML = createTag(tagList);
    document.body.appendChild(container);
    const text: HTMLSpanElement = container.querySelector('.text');
    const computedStyle = getComputedStyle(text);
    const maxHeight = Math.floor(
      (text.offsetHeight + pxToNumber(computedStyle.marginBottom)) * rows
    );

    if (container.offsetHeight <= maxHeight) {
      setExceeded(false);
      setTagList((prev) => {
        return tagList.map((item) => item);
      });
    } else {
      setExceeded(true);
      const end = tagList.length;
      const check = (left, right) => {
        // 无限靠近目标
        if (right - left <= 1) {
          return left;
        }
        const middle = Math.round((left + right) / 2);
        container.innerHTML = createTag(tagList.slice(0, middle));
        if (container.offsetHeight < maxHeight) {
          return check(middle, right);
        } else {
          return check(left, middle);
        }
      };
      const target = check(0, end);
      setTagList(tagList.slice(0, target));
    }
    document.body.removeChild(container);
  }
  useLayoutEffect(() => {
    calcEllipsised();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', calcEllipsised);
    // calcEllipsised();
    return () => window.removeEventListener('resize', calcEllipsised);
  }, []);

  return (
    <div className="outWrap" id="wrap">
      <div className="box" ref={rootRef} id="box">
        {tagList.map((tag, index) => (
          <span className="text" key={index}>
            {tag.label}
          </span>
        ))}
      </div>
      {exceeded && <span>查看标签</span>}
    </div>
  );
};

export default Tags;
