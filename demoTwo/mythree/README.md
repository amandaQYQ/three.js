# 坐标系

three.js中使用的是右手坐标系，X轴水平向右，y轴垂直向上，Z轴的方向就是屏幕由里往外的方向。

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/7.jpg?raw=true" width="300" height="300" >

# 三要素：
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

    * 常用方法setClearColor()

    >`renderer.setClearColor(0x000000);`

    我们可以使用上面的代码(用于清除画面的颜色)将背景色设置为黑色：

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
    不设置时，相机默认是由正z轴看像-z轴（相机镜头对着-z轴方向拍），就是我们由屏幕外向屏幕内看一样。


3. scene:

    >`let scene = new THREE.Scene();`

    场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。

    * 常用方法add()

    >`scene.add( cube );`

    cube是包含有一个几何体以及应用在在此几何体上的材质的对象，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。后面会讲如何制作一个cube。

    默认情况下，当我们调用scene.add()的时候，物体将会被添加到坐标为(0,0,0)的位置。但这可能会使得摄像机的位置和立方体相互重叠（也就是摄像机位于立方体中）。从而看不到东西，所以我们会用camera的position.set()。

# 照相机
照相机就是一个抽象，它定义了三维空间到二维屏幕投影的方式，用“照相机”这样一个类比，可以使我们直观地理解这一投影方式。


而针对投影方式的不同，照相机又分为正交投影照相机(`OrthographicCamera`)与透视投影照相机(`PerspectiveCamera`)。


- 透视投影(`PerspectiveCamera`)：类似人眼在真实世界中看到的有“近大远小”的效果（如下图中的(a)）；


- 正交投影(`OrthographicCamera`)：像数学几何效果，对于三维空间内平行的线，投影到二维空间中也一定是平行的（如下图中的(b)）。

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/8.jpg?raw=true" width="500" height="250">

1. 正交投影照相机

>`THREE.OrthographicCamera(left, right, top, bottom, near, far)`

这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/9.png?raw=true" width="300" height="250">



**<font color=#0099ff size=3 face="黑体">& 为了保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例(800/600)一致。</font>**

ex:

```
    ...
    renderer.setSize(800, 600);

    ...
    const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);

    其中800 / 600 是 4 / 3

    right-left = 2-(-2) = 4
    top-bottom = 1.5 - (-1.5) = 3
    也是4 / 3
```

**<font color=#0099ff size=3 face="黑体">& 关于相机的摆放位置 影响 物体的平面展示效果。</font>**

**<font color=red size=2 face="黑体">照相机的位置（照相机X坐标决定视野的左右移动，Y轴坐标决定视野的上下移动，Z轴决定物体的大小）。</font>**

* X坐标增加——物体左移 

* X坐标减小——物体右移

* Y坐标增加——物体下移

* Y坐标减小——物体上移

* Z坐标增加——物体“小”了

* Z坐标减小——物体“大”了


说道这里得提到 **相机的摆放**，以及 **相机的朝向** 两点。（参考orthographicCamera.js, 展示demo)

```
    // x轴：4；  y轴：-3；  z轴：5
    camera.position.set(0, 0, 5);  // 相机的摆放
    camera.lookAt(0, 0, 0); // 相机的朝向
``` 
**照相机默认是沿着z轴的负方向观察的,当相机观察的方向，看不到物体时，我们可以通过lookAt函数调整他的方向**

举例：(参考orthographicCamera.js,相机的摆放)
```
    const renderer = new THREE.WebGLRenderer(
        { canvas: document.getElementById('orthographicCamera') }
    );
    renderer.setSize(800, 600);
    renderer.setClearColor('#84d0ee');

    const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    camera.position.set(0, 0, 5);

    const scene = new THREE.Scene();


    const cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    );

    scene.add(cube);

    renderer.render(scene, camera);
```

此时立方体在视角正中央！但是假如我们移动相机的位置：

```
    camera.position.set(4, -3, 5);
```

由于相机默认是朝着z轴负方向观察，所以我们就看不到立方体。

但是我们可以调整观察的角度,让相机看向原点，而不是z轴负方向， 就能看到了：

```
    camera.lookAt(0, 0, 0);
```

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/10.png?raw=true" width="300" height="250">


2. 透视投影照相机

>`THREE.PerspectiveCamera(fov, aspect, near, far)`

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/11.png?raw=true" width="600" height="350">


* fov（竖直张角）设置的更大时，物体就越小。


<img src="https://github.com/amandaQYQ/three.js/blob/master/img/12.jpg?raw=true" width="300" height="200">

* aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。

* near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。

* 只有离相机的距离大于near值，小于far值，且在相机的可视角度之内，才能被相机投影到。

<img src="https://github.com/amandaQYQ/three.js/blob/master/img/13.png?raw=true" width="300" height="300">

# 点、线、面

## 1.点

>`var point = new THREE.Vecotr3(4,8,9);`

or

```
    var point1 = new THREE.Vector3();

    point1.set(4,8,9);
```

提问：

如何把点直接添加到场景里呢？

## 2.线

```
    // 定义几何体
    var geometry = new THREE.Geometry();
    // 定义材质
    var material = THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors } );

    // 定义两个点
    var p1 = new THREE.Vector3(-100,0,100);
    var p2 = new THREE.Vector3();
    p2.set(100,0,-100);

    // 将点放置到几何体中
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);

    // 定义颜色
    var color1 = new THREE.Color( 0x444444 ),
    var color2 = new THREE.Color( 0xFF0000 );
    geometry.colors.push( color1, color2 );

    // 定义一条线
    var line = new THREE.Line( geometry, material, THREE.LinePieces );

    scene.add(line);
```

## 3.面
绘制网格线，参考Demo（line）


# 基本几何形状

## 1.立方体（cubeGeometry)

>`const cube = new THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments）`

width是x方向上的长度；

height是y方向上的长度；

depth是z方向上的长度；

后三个参数分别是在三个方向上的分段数，如：

widthSegments为3的话，代表x方向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的缺省值为1。其他几何形状中的分段也是类似的，下面不做说明。

demo参考(cube)

## 2.平面

>`new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)`

其中，width是x方向上的长度；height是y方向上的长度；后两个参数同样表示分段。
new THREE.PlaneGeometry(2, 4);创建的平面在x轴和y轴所在平面内：

参考demo(cube)


## 3.文字

使用文字前，需要下载和引用额外的字体库。字体库在[three.js Github master/examples/fonts](https://github.com/mrdoob/three.js/tree/dev/examples/fonts "下载地址")目录下，下载里面的json文件，放在你的目录下，然后加载。



# 其他常用方法属性

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
