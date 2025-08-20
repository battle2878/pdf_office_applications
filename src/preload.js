
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectMergeFiles: () => ipcRenderer.invoke('select-merge-files'),
    mergePdfs: (filePaths) => ipcRenderer.invoke('merge-pdfs', filePaths),
    // ... expose other functions here
    splitPdf: (filePath, splitMethod, splitPages, pageRanges) => ipcRenderer.invoke('split-pdf', filePath, splitMethod, splitPages, pageRanges),
    extractPages: (filePath, pagesToExtract) => ipcRenderer.invoke('extract-pages', filePath, pagesToExtract),
    reorderPdf: (filePath, reorderedPages) => ipcRenderer.invoke('reorder-pdf', filePath, reorderedPages),
    rotatePdf: (filePath, angle, scope, range) => ipcRenderer.invoke('rotate-pdf', filePath, angle, scope, range),
    compressPdf: (filePath, compressionLevel, optimizeImages, removeMetadata) => ipcRenderer.invoke('compress-pdf', filePath, compressionLevel, optimizeImages, removeMetadata),
    convertFromPdf: (filePath, conversionType, options) => ipcRenderer.invoke('convert-from-pdf', filePath, conversionType, options),
    convertToPdf: (conversionType, filePaths, textInput, options) => ipcRenderer.invoke('convert-to-pdf', conversionType, filePaths, textInput, options)
});

// contextBridge.exposeInMainWorld('electronAPI', {
//     // Expose all your functions here with the correct syntax
//     mergePdfs: (filePaths) => ipcRenderer.invoke('merge-pdfs', filePaths),
//     splitPdf: (filePath, splitMethod, splitPages, pageRanges) => ipcRenderer.invoke('split-pdf', filePath, splitMethod, splitPages, pageRanges),
//     extractPages: (filePath, pagesToExtract) => ipcRenderer.invoke('extract-pages', filePath, pagesToExtract),
//     reorderPdf: (filePath, reorderedPages) => ipcRenderer.invoke('reorder-pdf', filePath, reorderedPages),
//     rotatePdf: (filePath, angle, scope, range) => ipcRenderer.invoke('rotate-pdf', filePath, angle, scope, range),
//     compressPdf: (filePath, compressionLevel, optimizeImages, removeMetadata) => ipcRenderer.invoke('compress-pdf', filePath, compressionLevel, optimizeImages, removeMetadata),
//     convertFromPdf: (filePath, conversionType, options) => ipcRenderer.invoke('convert-from-pdf', filePath, conversionType, options),
//     convertToPdf: (conversionType, filePaths, textInput, options) => ipcRenderer.invoke('convert-to-pdf', conversionType, filePaths, textInput, options)
// });
// contextBridge.exposeInMainWorld('electronAPI', {
//     // Make sure all your functions are listed here with correct syntax
//     mergePdfs: (filePaths) => ipcRenderer.invoke('merge-pdfs', filePaths),
//     splitPdf: (filePath, splitMethod, splitPages, pageRanges) => ipcRenderer.invoke('split-pdf', filePath, splitMethod, splitPages, pageRanges),
//     // ... all other functions
// });
// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     mergePdfs: (filePaths) => ipcRenderer.invoke('merge-pdfs', filePaths),
//     splitPdf: (filePath, splitMethod, splitPages, pageRanges) => ipcRenderer.invoke('split-pdf', filePath, splitMethod, splitPages, pageRanges),
//     extractPages: (filePath, pagesToExtract) => ipcRenderer.invoke('extract-pages', filePath, pagesToExtract),
//     reorderPdf: (filePath, reorderedPages) => ipcRenderer.invoke('reorder-pdf', filePath, reorderedPages),
//     rotatePdf: (filePath, angle, scope, range) => ipcRenderer.invoke('rotate-pdf', filePath, angle, scope, range),
//     compressPdf: (filePath, compressionLevel, optimizeImages, removeMetadata) => ipcRenderer.invoke('compress-pdf', filePath, compressionLevel, optimizeImages, removeMetadata),
//     convertFromPdf: (filePath, conversionType, options) => ipcRenderer.invoke('convert-from-pdf', filePath, conversionType, options),
//     convertToPdf: (conversionType, filePaths, textInput, options) => ipcRenderer.invoke('convert-to-pdf', conversionType, filePaths, textInput, options)
// });