uniform sampler2D u_image;

varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(u_image, vUv);
}