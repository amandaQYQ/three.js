## 三要素：
1. renderer： 

   >`var renderer = new THREE.WebGLRenderer();`

   * 常用属性canvas： 一个供渲染器绘制其输出的canvas 它和下面的domElement属性对应。如果没有传这个参数，会创建一个新canvas。

        ex：
        >`let renderer = new THREE.WebGLRenderer({ canvas: this.myRef.current});`

    * 常用属性domElement：一个canvas，渲染器在其上绘制输出。

        ex：
        >`document.body.appendChild( renderer.domElement );`

2.  camera：

    >`var camera = new THREE.PerspectiveCamera( 45, 2, 1, 500 );`







## 坑

### ①在使用 new OrbitControls(camera, canvas)时，报错：
>`OrbitControls' is not exported from 'three' (imported as 'THREE')`.

解决： 
> `npm install three-orbitcontrols`

> `import OrbitControls from 'three-orbitcontrols'`

> `const controls = new OrbitControls(camera, canvas);`

[参考](https://www.npmjs.com/package/three-orbitcontrols "https://www.npmjs.com/package/three-orbitcontrols")