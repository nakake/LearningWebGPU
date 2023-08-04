struct Fragment {
    @builtin(position) Position : vec4<f32>,
    @location(0) Color : vec4<f32>
};

@vertex
fn vs_main(
    @location(0) position: vec2<f32>,
    @location(1) color: vec3<f32>,
    @builtin(vertex_index) v_id: u32
) -> Fragment {

    var output : Fragment;
    output.Position = vec4<f32>(position, 0.0, 1.0);
    output.Color = vec4<f32>(color, 1.0);

    return output;
}

@fragment
fn fs_main(
    @location(0) Color: vec4<f32>
) -> @location(0) vec4<f32> {
    return Color;
}