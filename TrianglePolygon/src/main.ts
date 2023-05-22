import shader from './shaders/shader.wgsl'

async function Init() {

    const adapter : GPUAdapter = <GPUAdapter> await  navigator.gpu?.requestAdapter();
    const device : GPUDevice = <GPUDevice> await adapter?.requestDevice();

    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("gfx-main");
    const context : GPUCanvasContext = <GPUCanvasContext> canvas.getContext("webgpu");
    const format : GPUTextureFormat = "bgra8unorm";
    context.configure({
        device:device,
        format:format,
        alphaMode: "opaque"
    });

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [],
    });

    const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: []
    });

    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts:[bindGroupLayout]
    });

    const shaderModule = device.createShaderModule({
        code: shader
    });

    const pipeline = device.createRenderPipeline({
        vertex:{
            module: shaderModule,
            entryPoint: "vs_main"
        },

        fragment:{
            module: shaderModule,
            entryPoint: "fs_main",
            targets: [{
                format: format
            }]
        },

        layout: pipelineLayout
    });

    const commandEncoder : GPUCommandEncoder = device.createCommandEncoder();
    const textureView : GPUTextureView = context.getCurrentTexture().createView();
    const renderpass : GPURenderPassEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: {r: 0.5, g: 0.5, b: 0.5, a: 1.0},
            loadOp: "clear",
            storeOp: "store"
        }]
    });
    renderpass.setPipeline(pipeline);
    renderpass.setBindGroup(0, bindGroup);
    renderpass.draw(3, 1, 0, 0);
    renderpass.end();

    device.queue.submit([commandEncoder.finish()]);
}

Init();