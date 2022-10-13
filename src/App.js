import './App.css';
import { useEffect } from "react"
import * as THREE from 'three';
import vertex from "./vertex.vert"
import fragment from "./fragment.frag"

function App() {
  useEffect(() => {
    let camera, scene, renderer;

    let uniforms;
    let texture1;
    const loader = new THREE.TextureLoader();
    loader.load(
      "/fo.jpg",
      (texture) => {
        texture1 = texture;
        init();
        animate();
      }
    );

    const sizes = {
      width: 375,
      height: 375
    }
    function init() {

      camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

      scene = new THREE.Scene();

      const geometry = new THREE.PlaneGeometry(2, 2, 30, 30);
      uniforms = {
        p1: {
          value: Array.apply(0.0,Array(8)).map((item) => {
            return new THREE.Vector2(Math.random(), Math.random())
          })
        },
        p2: {
          value: Array.apply(0.0, Array(8)).map((item) => {
            return new THREE.Vector2(Math.random(), Math.random())
          })
        },
        u_image: { value: texture1 },
        time: { value: 0.01 },
      };

      const material = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      const canvas = document.querySelector("canvas.wrap")
      renderer = new THREE.WebGLRenderer({
        canvas: canvas
      });
      renderer.setSize(sizes.width, sizes.height)

      onWindowResize();

      window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize() {

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    function animate() {

      requestAnimationFrame(animate);
      uniforms['time'].value = performance.now() / 1000;
      renderer.render(scene, camera);

    }
    return () => {
    }
  }, [])

  return (
    <div id="container">
      <canvas className="wrap" width="375" height="375" style={{
        maxHeight: "375px",
        maxWidth: "375px"
      }}></canvas>
    </div>
  );
}

export default App;
