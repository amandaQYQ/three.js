## 三要素：
1. renderer： 

   >`var renderer = new THREE.WebGLRenderer(param: Object);`

   * 常用属性canvas： 一个供渲染器绘制其输出的canvas 它和下面的domElement属性对应。如果没有传这个参数，会创建一个新canvas。

        ex：
        >`let renderer = new THREE.WebGLRenderer({ canvas: this.myRef.current});`

    * 常用属性domElement：一个canvas，渲染器在其上绘制输出。

        ex：
        >`document.body.appendChild( renderer.domElement );`

    * 常用方法setSize()

    >`renderer.setSize( window.innerWidth, window.innerHeight );`

2.  camera：

    >`var camera = new THREE.PerspectiveCamera( 45, 2, 1, 500 );`

    这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
    
    `PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )`.

    fov — 摄像机视锥体垂直视野角度

    aspect — 摄像机视锥体长宽比

    near — 摄像机视锥体近端面

    far — 摄像机视锥体远端面

     
    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/1.png?raw=true" width="300" height="300" align=center>

    * 常用方法set()

    >`camera.position.set(0, 0, 5);`

    或者：

    >`camera.position.z = 5;`


    * 常用方法lookAt()

    >`camera.lookAt(0, 0, 0);`

    设置相机的朝向，即相机看向哪边。


3. scene:

    >`let scene = new THREE.Scene();`

    场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。

    * 常用方法add()

    >`scene.add( cube );`

    cube是包含有一个几何体以及应用在在此几何体上的材质的对象，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。后面会讲如何制作一个cube。

    默认情况下，当我们调用scene.add()的时候，物体将会被添加到坐标为(0,0,0)的位置。但这可能会使得摄像机的位置和立方体相互重叠（也就是摄像机位于立方体中）。从而看不到东西，所以我们会用camera的position.set()。

## 其他常用方法属性

1. 材质（颜色、贴图、纹理、光照等）
    #### 1.1  THREE.MeshBasicMaterial();

    ##### ①  颜色

    >`const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });`

        颜色前需加上前缀0x


    ##### ②  贴图

    - 同一几何体应用一张贴图
    >`const material = new THREE.MeshBasicMaterial({
        map: loader.load('url'),
    });`

    - 同一几何体应用多张贴图
    >`const materials = [
            new THREE.MeshBasicMaterial({map:loader.load(jpg2)}),
            new THREE.MeshBasicMaterial({map:loader.load(jpg3)}),
            new THREE.MeshBasicMaterial({map:loader.load(jpg4)}),
            new THREE.MeshBasicMaterial({map:loader.load(jpg5)}),
            new THREE.MeshBasicMaterial({map:loader.load(jpg6)}),
            new THREE.MeshBasicMaterial({map:loader.load(jpg7)})
        ];`

    ！注意：

        使用纹理贴图，花费很大，即使你使用压缩的图形，但是你使用纹理的模型越大，那么该纹理占用的内存也越大。


    ```
        export var NearestFilter = 1003;
        export var NearestMipMapNearestFilter = 1004;
        export var NearestMipMapLinearFilter = 1005;
        export var LinearFilter = 1006;
        export var LinearMipMapNearestFilter = 1007;
        export var LinearMipMapLinearFilter = 1008;
    ```

2. 加载器

    加载器：处理并跟踪已加载和待处理的数据。如果未手动设置加强管理器，则会为加载器创建和使用默认全局实例加载器管理器DefaultLoadingManager.

    ##### 2.1 DefaultLoadingManager

    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/2.png?raw=true" width="500" height="500" align=center>

    ！ 注意 ：
    
        在文档里有onStart这个方法，然而我在源码里没看到onStart，并且应用时onStart没触发。
    [源码地址](https://github.com/mrdoob/three.js/blob/master/src/loaders/LoadingManager.js )

    一般来说，默认的加载管理器已足够使用了，但有时候也需要设置单独的加载器 - 例如，如果你想为对象和纹理显示单独的加载条。（如例子中  material.js  内的   OptimizedTexture ）


    ##### 2.2 LoadingManager

    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/3.png?raw=true" width="500" height="500" align=center>
