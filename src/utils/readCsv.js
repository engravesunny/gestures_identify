// 读取 CSV 文件
function readCsv (file) {
    const reader = new FileReader();
    const data = [];
    reader.addEventListener('load', function() {
      const csvText = reader.result;
      const lines = csvText.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const cells = lines[i].split(',');
        const row = [];
        for (let j = 0; j < cells.length; j++) {
          row.push(cells[j]);
        }
        data.push(row);
      }
    });
    reader.readAsText(file);
    return data
  }
export default readCsv