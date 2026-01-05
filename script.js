function generateMoM() {
    const transcript = document.getElementById("transcript").value.toLowerCase();

    if (transcript.trim() === "") {
        alert("Please paste a meeting transcript.");
        return;
    }

    // --------- BASIC INTENT DETECTION ----------
    let purpose = "General project discussion";
    let risks = [];
    let actions = [];

    if (transcript.includes("delay") || transcript.includes("late")) {
        purpose = "Review project delay and identify corrective actions";
        risks.push("Project timeline slippage");
    }

    if (transcript.includes("client")) {
        risks.push("Client dissatisfaction");
        actions.push(["Communicate updated status to client", "Project Manager", "Immediate", "High"]);
    }

    if (transcript.includes("testing") || transcript.includes("bug")) {
        actions.push(["Complete pending testing activities", "Engineering Lead", "TBD", "High"]);
        risks.push("Product quality issues");
    }

    if (transcript.includes("marketing")) {
        actions.push(["Align marketing communication with revised timeline", "Marketing Lead", "TBD", "Medium"]);
    }

    if (transcript.includes("vendor") || transcript.includes("operations")) {
        actions.push(["Update vendors on revised timelines", "Operations Team", "After confirmation", "Medium"]);
        risks.push("Operational cost escalation");
    }

    // --------- GENERATE MoM ----------
    let momHTML = `
        <strong>Meeting Purpose:</strong> ${purpose}<br><br>

        <strong>Key Discussion Points:</strong>
        <ul>
            <li>Review of current project status</li>
            <li>Identification of key challenges and dependencies</li>
        </ul>

        <strong>Identified Risks:</strong>
        <ul>
            ${risks.map(r => `<li>${r}</li>`).join("") || "<li>No major risks identified</li>"}
        </ul>

        <strong>Next Steps:</strong>
        <ul>
            <li>Define clear ownership and timelines</li>
            <li>Ensure structured follow-up communication</li>
        </ul>
    `;

    document.getElementById("mom").innerHTML = momHTML;

    // --------- GENERATE ACTION TABLE ----------
    const tableBody = document.querySelector("#actions tbody");
    tableBody.innerHTML = "";

    if (actions.length === 0) {
        actions.push(["Review meeting outcomes and define next steps", "Project Manager", "TBD", "Low"]);
    }

    actions.forEach(action => {
        const row = document.createElement("tr");
        action.forEach(item => {
            const cell = document.createElement("td");
            cell.contentEditable = "true"; // user can refine AI output
            cell.innerText = item;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
