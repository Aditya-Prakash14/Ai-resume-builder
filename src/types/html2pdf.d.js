'html2pdf.js' {
  ;
    html2canvas?: {
      scale?;
      useCORS?;
      letterRendering?;
    };
    jsPDF?: {
      unit?;
      format?;
      orientation?;
    };
  }

  

  function html2pdf(): Html2PdfInstance;
  export default html2pdf;
} 