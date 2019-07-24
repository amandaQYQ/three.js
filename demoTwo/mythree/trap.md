## 坑

### ①在使用 new OrbitControls(camera, canvas)时，报错：
>`OrbitControls' is not exported from 'three' (imported as 'THREE')`.

解决： 
> `npm install three-orbitcontrols`

> `import OrbitControls from 'three-orbitcontrols'`

> `const controls = new OrbitControls(camera, canvas);`

[参考](https://www.npmjs.com/package/three-orbitcontrols "https://www.npmjs.com/package/three-orbitcontrols")

### ②在使用TextureLoader().load(png..url)时，使用MeshPhongMaterial使得图片无法加载。改成MeshBasicMaterial就成。

- MeshBasicMaterial

    是一种非常简单的材质，继承自Material，这种材质不受光线的影响，可以显示模型的线框，对场景中的雾化会有反应。通过操作示例可以对这种材质有一定的了解

    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/6.png?raw=true"  height="300" width="300">

    示例：https://ithanmang.gitee.io/threejs/home/201808/20180802/02-meshBasicMaterial.html

    参考网址：https://blog.csdn.net/ithanmang/article/details/81391743

- MeshPhongMaterial 

    该材料使用非基于物理的Blinn-Phong模型来计算反射系数。与在MeshLambertMaterial中使用的Lambertian模型不同，它可以模拟带有高光的闪亮表面（如漆木）。

    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/4.png?raw=true"  height="300" width="300">

    示例：https://ithanmang.gitee.io/threejs/home/201808/20180807/02-meshPhongMaterial.html

    参考网址：https://blog.csdn.net/ithanmang/article/details/81477061

- MeshLambertMaterial

    这种材质，可以创建看上去并不光亮（不具有光滑度）的表面，例如墙体等。该材质会对场景中的光源产生反应，并且该材质自身也会发出颜色，自身发出的颜色不受环境的影响。

    <img src="https://github.com/amandaQYQ/three.js/blob/master/img/5.png?raw=true"  height="300" width="300">

    示例：https://ithanmang.gitee.io/threejs/home/201808/20180807/01-meshLambertMaterial.html

    参考网址：https://blog.csdn.net/ithanmang/article/details/81476014