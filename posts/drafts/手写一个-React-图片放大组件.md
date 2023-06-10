---
title: 手写一个 React 图片预览组件
date: 2023-06-08 16:54:03
abbrlink: b4f558c5
author: 幻非
cover: 
comments: true
tags: [React]
copyright: true
categories: 
---

前几天打算给博客添加一个图片预览的效果，可在网上找了半天也没找到合适的库，于是自己干脆自己手写了个。

最终实现效果如下

![gif](https://pic.bibiu.cc/2023/06/09/6483463d2131c.gif)

## 实现原理

当鼠标点击图片时生成一个半透明遮罩，并添加一个与点击图片位置大小都相同的图片，之后通过 CSS 中的 `scale` 属性实现图片的放大，通过 `translate3d` 实现图片的居中，当再次点击时，通过删除样式实现图片返回。

## 具体操作

### 添加遮罩

使用 ReactDom 的 `createPortal` 方法将遮罩放到 body 的下面，这里样式采用的是 Tailwind

```javascript
function Mask() {
    return createPortal(
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/70'></div>, 
        document.body
    );
}
```

接着创建图片组件

```javascript
export default function Img(props) {
    const [status, setStatus] = useState(false);
    const click = () => {
        setStatus(true);
    };
    return (
        <>
            <img {...props} onClick={click} />
            {status && <Mask />}
        </>
    );
}
```

这样点击图片后便在 body 下生成一个半透明的遮罩。

### 遮罩上添加图片

因为要考虑图片的返回动画，所以这里的图片位置不要使用 `getBoundingClientRect` 提供的相对于视图窗口的坐标，而是使用 `offsetTop` 和 `offsetLeft` 提供的相对于 offsetParent 的坐标。所以才需要在 body 下创建元素并且添加的图片需要跟遮罩同一级。

```js
function Mask({ props, imgRef }) {
    return createPortal(
        <>
            <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/70'></div>
            <img
                {...props}
                className='absolute'
                style={{
                    top: imgRef.current.offsetTop,
                    left: imgRef.current.offsetLeft,
                    width: imgRef.current.offsetWidth,
                    height: imgRef.current.offsetHeight,
                }}
            />
        </>,
        document.body
    );
}

export default function Img(props) {
    const [status, setStatus] = useState(false);
    const imgRef = useRef(null);
    const click = () => {
        setStatus(true);
    };
    return (
        <>
            <img ref={imgRef} {...props} onClick={click} />
            {status && <Mask props={props} imgRef={imgRef} />}
        </>
    );
}
```

此时点击图片便会在 body 下生成一个遮罩和处在相同位置的图片

![image-20230610155224250](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20230610155224250.png)

### 计算 scale 和 translate3d 

`scale()` 的数值为图片缩放的倍数，所以需要分别求出图片宽度和高度的最大缩放倍数，然后对比取最小值。

当图片原始尺寸小于屏幕尺寸时，直接用原始尺寸除以显示尺寸，当大于屏幕尺寸时，则用屏幕尺寸除以显示尺寸，因为图片不能放大到超过屏幕尺寸。

具体实现代码如下

```javascript
const calcFitScale = imgRef => {
    const margin = 5;
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imgRef.current;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
    const scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
    const scale = Math.min(scaleX, scaleY) - margin / Math.min(width, height) + 0.002;
    const translateX = ((viewportWidth - width) / 2 - left) / scale;
    const translateY = ((viewportHeight - height) / 2 - top) / scale;
    return `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;
};
```

