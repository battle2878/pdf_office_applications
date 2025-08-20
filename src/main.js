const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs/promises');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Correct file path to load index.html from the root folder
    mainWindow.loadFile(path.join(__dirname, './index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// ... other ipcMain handlers ...


ipcMain.handle('select-merge-files', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: 'Select PDF Files to Merge',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });
    if (canceled) {
        return { success: false, message: 'File selection cancelled.' };
    }
    return { success: true, filePaths };
});

ipcMain.handle('merge-pdfs', async (event, filePaths) => {
    try {
        const mergedPdf = await PDFDocument.create();
        for (const filePath of filePaths) {
            const pdfBytes = await fs.readFile(filePath);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const { filePath } = await dialog.showSaveDialog(mainWindow, {
            title: 'Save Merged PDF',
            defaultPath: path.join(app.getPath('documents'), 'merged.pdf'),
            filters: [{ name: 'PDF Documents', extensions: ['pdf'] }]
        });

        if (filePath) {
            await fs.writeFile(filePath, mergedPdfBytes);
            return { success: true, message: `PDFs merged and saved to ${path.basename(filePath)}.` };
        } else {
            return { success: false, message: 'Save operation cancelled.' };
        }
    } catch (error) {
        return { success: false, message: `Failed to merge PDFs: ${error.message}` };
    }
});