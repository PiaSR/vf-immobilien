// 🚀 /scripts/extract-critical.js (With Globbing to Handle Hashed Filenames)

// "critical:generate": "astro build --output static && node scripts/extract-critical.js && npm run build"
    // if new critical css is needed, add above lineand to package.json scripts add export const prerender = true; to top of index.astro page (makes page static)
    
import * as critical from 'critical'; 
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob'; // Import fast-glob

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve(__dirname, '../dist', 'client');
const srcStylesDir = path.resolve(__dirname, '../src', 'styles'); // moving out of dist so it doesn't get removed with new builds

async function extractCriticalCSS() {
    try {
        // 1. Find all compiled CSS files in the _astro directory
        const cssFiles = await fg('**/*.css', { 
            cwd: path.join(clientDir, '_astro'),
            absolute: true, // Get full paths
        });
        
        if (cssFiles.length === 0) {
            console.error('❌ Could not find any CSS files in the build output.');
            return;
        }

        console.log(`Found CSS files: \n- ${cssFiles.map(f => path.basename(f)).join('\n- ')}`);

        // 2. Generate Critical CSS
        critical.generate({
            base: clientDir,
            src: 'index.html', 
            // Pass the absolute paths of the found CSS files
            css: cssFiles, 

            target: {
                css: path.join(srcStylesDir, 'critical.css'),            },
            penthouse: {
                // This is the timeout for the actual CSS analysis logic (usually fine at 60s)
                timeout: 60000, 
                
                // You might also need to configure the browser launch if it's struggling
                // This is often a good default for local use:
                blockJSRequests: false, 
            },
            inline: false, 
            extract: true,
            
        }, (err) => {
            if (err) {
                console.error('Critical CSS generation failed:', err);
            } else {
                console.log('✅ Critical CSS successfully extracted to dist/client/critical.css');
            }
        });
        
    } catch (error) {
        console.error('An error occurred during critical CSS process:', error);
    }
}

extractCriticalCSS();
