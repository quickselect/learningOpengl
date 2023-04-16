#version 330 core
out vec4 FragColor;  
in vec3 ourColor;
in vec2 texCoord;

uniform sampler2D ourTexture;
uniform sampler2D ourTexture2;
  
void main()
{
    // FragColor = vec4(ourColor, 1.0);
    FragColor = mix(texture(ourTexture, texCoord),texture(ourTexture2,vec2(texCoord.x,texCoord.y)),0.5);
}