#version 330

in vec2 v_uv;

uniform sampler2D u_screen_texture;

layout (location = 0) out vec4 fragColor;
layout (location = 1) out vec4 brightColor;
//out vec4 fragColor;

void main(){

/*----------PIXELATION-------------*/
	/*
	float dx = 15.*(1./512.);
	float dy = 10.*(1./512.);
	vec2 coord = vec2(dx*floor(v_uv[0]/dx),
					   dy*floor(v_uv[1]/dy));
	vec3 col = texture(u_screen_texture, coord).xyz;
	*/

/*---------NEGATIVE EFFECT-----------*/
	/*
	vec3 colnormal = texture(u_screen_texture, v_uv).xyz;
	vec3 col = vec3(1 - colnormal[0], 1 - colnormal[1], 1 - colnormal[2]);
	*/

/*---------CONTRAST EFFECT-----------*/
	/*
	float contrast = 0.8;
	vec3 colnormal = texture(u_screen_texture, v_uv).xyz;
	vec3 col = (colnormal.xyz - 0.5) * (1.0 + contrast) + 0.5; 
	*/

/*-----------GREYSCALE--------------*/
	/*
	vec3 prepostcolor = texture(u_screen_texture, v_uv).xyz;
	float average = 0.2126 * prepostcolor.x + 0.7152 * prepostcolor.y + 0.0722 * prepostcolor.z;
	fragColor = vec4(average, average, average, 1.0);
	*/

/*------------SHARPEN----------------*/
	/*
	const float offset = 1.0 / 300.0;
	vec2 offsets[9] = vec2[](
        vec2(-offset,  offset), // top-left
        vec2( 0.0f,    offset), // top-center
        vec2( offset,  offset), // top-right
        vec2(-offset,  0.0f),   // center-left
        vec2( 0.0f,    0.0f),   // center-center
        vec2( offset,  0.0f),   // center-right
        vec2(-offset, -offset), // bottom-left
        vec2( 0.0f,   -offset), // bottom-center
        vec2( offset, -offset)  // bottom-right    
    );

	float kernel[9] = float[](
        -1, -1, -1,
        -1,  9, -1,
        -1, -1, -1
    );

	vec3 sampleTex[9];
    for(int i = 0; i < 9; i++){
        sampleTex[i] = vec3(texture(u_screen_texture, v_uv.st + offsets[i]));
    }
    vec3 col = vec3(0.0);
    for(int i = 0; i < 9; i++)
        col += sampleTex[i] * kernel[i];

	fragColor = vec4(col, 1.0);
	*/
	
/*----------------HDR----------------*/
	
	/*--------TONE MAPPING------*/
	/*
	//This is the process of transforming floating point color values to the expected [0.0, 1.0] range known as low dynamic range without losing too much detail
	
	const float gamma = 2.2;
    vec3 hdrColor = texture(u_screen_texture, v_uv).xyz;
  
    // Reinhard Tone Mapping
    vec3 mapped = hdrColor / (hdrColor + vec3(1.0));
    // gamma correction 
    mapped = pow(mapped, vec3(1.0 / gamma));
	
	vec3 col = mapped;
	*/
	/*--------EXPOSURE--------*/
	/*
	const float exposure = 0.5;
	const float gamma = 2.2;
    vec3 hdrColor = texture(u_screen_texture, v_uv).xyz;
  
    // Exposure tone mapping
    vec3 mapped = vec3(1.0) - exp(-hdrColor * exposure);
    // Gamma correction 
    mapped = pow(mapped, vec3(1.0 / gamma));
	
	vec3 col = mapped;
	*/

/*----------FOR BLOOM EFFECT----------*/
	
	vec3 col = texture(u_screen_texture, v_uv).xyz;
	fragColor = vec4(col,1.0f);
	float brightness = dot(fragColor.xyz, vec3(0.2126, 0.7152, 0.0722));
	
	if(brightness >= 0.8){
		brightColor = vec4(1.0,1.0,1.0, 1.0);
	}else{
		brightColor = vec4(0.0,0.0,0.0, 1.0);
	}
}
