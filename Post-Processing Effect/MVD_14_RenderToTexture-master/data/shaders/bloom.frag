#version 330

in vec2 v_uv;

uniform sampler2D u_screen_texture;
uniform sampler2D u_bloom_blur;
uniform float exposure;

layout (location = 0) out vec4 fragColor;
layout (location = 1) out vec4 brightColor;

void main(){
	
	const float gamma = 2.2;
	vec3 hdrColor = texture(u_screen_texture, v_uv).xyz;
	vec3 bloomColor = texture(u_bloom_blur, v_uv).xyz;
	hdrColor += bloomColor; //additive blending

	//tone mapping
	vec3 col = vec3(1.0) - exp(-hdrColor * exposure);
	//also gamma correct to improve the final results
	col = pow(col, vec3(1.0 / gamma));

	fragColor = vec4(bloomColor,1.0f);
}
