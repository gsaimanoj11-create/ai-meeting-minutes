function generateMoM() {
    const transcript = document.getElementById("transcript").value;

    if (transcript.trim() === "") {
        alert("Please paste a meeting transcript.");
        return;
    }

    const momText = `
    <strong>Meeting Purpose:</strong> Review product launch delay and align on next steps.<br><br>
    <strong>Key Discussion Points:</strong>
    <ul>
        <li>Delay caused by requirement changes and incomplete testing</li>
        <li>Client dissatisfaction due to unclear timelines</li>
        <li>Operational and cost risks identified</li>
    </ul>
    <strong>Decisions Taken:</strong>
    <ul>
        <li>Requirements frozen with immediate effect</li>
        <li>Demo-ready build targeted by month-end</li>
        <li>Single point of communication established</li>
    </ul>
    `;

    document.getElementById("mom").innerHTML = momText;

    const actions = [
        ["Prepare demo-ready product build", "Engineering Lead", "28th", "High"],
        ["Freeze final requirements", "Marketing Lead", "Immediate", "Medium"],
        ["Communicate revised timeline to client", "Project Manager", "24th", "High"],
        ["Update vendor timelines", "Operations", "Post confirmation", "Medium"]
    ];

    const tableBody = document.querySelector("#actions tbody");
    tableBody.innerHTML = "";

    actions.forEach(action => {
        const row = document.createElement("tr");
        action.forEach(item => {
            const cell = document.createElement("td");
            cell.contentEditable = "true";
            cell.innerText = item;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
