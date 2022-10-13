varying vec2 vUv;
#define MAXPOINTS 8
// where the drag ended
uniform vec2 p1[MAXPOINTS];
uniform vec2 p2[MAXPOINTS];
float rand(float n){return fract(sin(n)*43758.5453123);}

float noise(float p){
    float fl=floor(p);
    float fc=fract(p);
    return mix(rand(fl),rand(fl+1.),fc);
}
uniform float time;
void main(){
    
    vUv=uv;// Set the texture coord to use
    
    vec2 position=uv*2.-1.;// convert 0 - 1 range to -1 to +1 range
    
    for(int i=0;i<MAXPOINTS;i++)
    {
        float dragdistance=distance(p1[i],p2[i]);
        float mydistance=distance(p1[i],position);
        
        if(mydistance<dragdistance)
        {
            vec2 maxdistort=(p2[i]-p1[i])/4.;
            
            float normalizeddistance=mydistance/dragdistance;
            
            float normalizedimpact=(cos(normalizeddistance*3.14159265359)+1.)/2.;
            
            position+=(maxdistort*normalizedimpact);
        }
    }
    
    gl_Position=vec4(position,0.,1.);
}