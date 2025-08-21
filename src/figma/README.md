# Figma Code Connect

For comprehensive documentation, visit: [Figma Code Connect Documentation](https://www.figma.com/developers/code-connect)

## Environment Variables

Create a .env file in the project root. Set up your environment with the following variables:

```bash
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_KEY=figma_file
```

## Basic Commands

### Connecting A New Component

```bash
# Generate a new file in a directory (update figma.config.json w/ alias)
npx figma connect create --outDir src/figma/primitives "frame_url"
```


### Publishing

```bash
# Validate before publishing
npx figma connect publish --dry-run

# Publish all files
npx figma connect publish

# Publish partial, doesn't work when 'include' paths exist in config
npx figma connect publish --dir src/figma/{file_path} --config figma.config.json

# Unpublish specific components
npx figma connect unpublish --ids "file_path"

```

## Copilot Prompts 

Use these prompts to enhance your Code Connect workflow:

### Connecting New Component
```
run npx figma connect create --outDir src/figma/primitives "frame_url" update the config file accordingly. In the new file replace the url with the alias in the config.
```
### Using Copilot + Figma MCP Server to code a design
```
#get_code "frame_url" output only the HTML no CSS. If a layer starts with "forge-" and not a component instance use that name for the wrapping html tag. Layers containing brackets "[*]" may provide context for attributes to include. Use annotations from the design to help infer properties to reference from the API design system docs #fetch "forge_component_doc_url"  
```