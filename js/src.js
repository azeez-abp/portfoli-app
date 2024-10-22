// worker.js
self.onmessage = async (event) => {
    const pdfUrl = event.data;
    console.log("WORKING")

    try {
        const response = await fetch(pdfUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const results = await response.arrayBuffer();
        const dataView = new DataView(results);

        const blob = new Blob([results], { type: 'application/pdf' });

        // You can now use the Blob to create a downloadable URL or send the binary data
        const url = URL.createObjectURL(blob);
    
        // Example: Open the PDF in a new tab
      
    
        // Example: Send the Blob to the main thread or server
        self.postMessage({ type: 'pdfData', data:  url, results});
        
        // Collect PDF data
        const pdfData = [];
        for (let i = 0; i < dataView.byteLength; i++) {
            pdfData.push(String.fromCharCode(dataView.getUint8(i))); // Read each byte
        }

        // Send the PDF data back to the main thread
        self.postMessage({ type: 'pdfData', data: pdfData.join() });
    } catch (error) {
        self.postMessage({ type: 'error', data: error.message });
    }
};
