function Worksheets() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Guided Worksheets</h2>
      <ul className="space-y-4">
        <li>
          <a href="https://www.therapistaid.com/worksheets/stress" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline text-lg">
            Stress Management Worksheet
          </a>
        </li>
        <li>
          <a href="https://positivepsychology.com/wp-content/uploads/2020/06/Stress-Management-Worksheet.pdf" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline text-lg">
            Stress Coping Worksheet (PDF)
          </a>
        </li>
        <li>
          <a href="https://www.therapistaid.com/worksheets/gratitude-journal" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline text-lg">
            Gratitude Journal Worksheet
          </a>
        </li>
      </ul>
    </div>
  );

}

export default Worksheets;
