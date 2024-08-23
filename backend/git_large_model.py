import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from PIL import Image
from transformers import AutoProcessor, AutoModelForCausalLM
import torch

# Load the processor and model
git_processor_large = AutoProcessor.from_pretrained("microsoft/git-base-coco")
git_model_large = AutoModelForCausalLM.from_pretrained("microsoft/git-base-coco")

# Determine if CUDA is available
device = "cuda" if torch.cuda.is_available() else "cpu"
git_model_large.to(device)

def generate_caption(processor, model, image, tokenizer=None):
    inputs = processor(images=image, return_tensors="pt").to(device)
    generated_ids = model.generate(pixel_values=inputs.pixel_values, max_length=50)
    if tokenizer is not None:
        generated_caption = tokenizer.batch_decode(generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]
    else:
        generated_caption = processor.batch_decode(generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]
    return generated_caption

def generate_captions_large(image):
    caption_git_large = generate_caption(git_processor_large, git_model_large, image)
    return caption_git_large

# Uncomment to test with an actual image
# image = Image.open('./images/boy-eat.jpg')
# print(generate_captions_large(image=image))
