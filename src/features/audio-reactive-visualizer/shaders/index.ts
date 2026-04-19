export const snoise = `
//	Simplex 3D Noise 
//	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

export const vertexShader = `
varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;    
    vUv = uv;
}
`;

export const fragmentShader = `
varying vec2 vUv;
uniform vec2 uViewportRes;
uniform float uTime;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

${snoise}

vec2 coverUvs(vec2 imageRes, vec2 containerRes, vec2 vUv)
{
    float imageAspectX = imageRes.x / imageRes.y;
    float imageAspectY = imageRes.y / imageRes.x;
    
    float containerAspectX = containerRes.x / containerRes.y;
    float containerAspectY = containerRes.y / containerRes.x;

    vec2 ratio = vec2(
        min(containerAspectX / imageAspectX, 1.0),
        min(containerAspectY / imageAspectY, 1.0)
    );

    vec2 newUvs = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    return newUvs;
}

void main()
{
    vec2 squareUvs = coverUvs(vec2(1.), uViewportRes, vUv);

    vec2 centeredUv = squareUvs - 0.5;
    
    float zoom = 1.0 - u_bass * 0.35; 
    centeredUv *= zoom;
    
    float angle = u_mid * 0.15;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    centeredUv = rot * centeredUv;

    squareUvs = centeredUv + 0.5;

    float time = uTime * 0.15;

    float noiseScale = 1.2 + u_treble * 0.3;
    float mainNoise = snoise(vec3(squareUvs * noiseScale, time));

    float wave = sin(squareUvs.x * 6.0 + time * 2.0 + mainNoise * 2.0) * 0.15 * u_bass;
    squareUvs.y += wave;

    float gradient = squareUvs.y;
    
    float distortionAmplitude = 0.25 + u_bass * 0.4;
    float distortedGradient = clamp(gradient + mainNoise * distortionAmplitude, 0.0, 1.0);
    
    vec3 colorMix1 = mix(u_color1, u_color2, smoothstep(0.0, 0.5, distortedGradient));
    vec3 colorMix2 = mix(colorMix1, u_color3, smoothstep(0.5, 1.0, distortedGradient));
    
    vec3 finalColor = colorMix2;
    
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
    finalColor += grain * u_treble * 0.08;
    
    finalColor += u_bass * 0.08;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;
