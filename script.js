function generateMoM() {
    const rawText = document.getElementById("transcript").value;
    const text = rawText.toLowerCase();

    if (text.trim() === "") {
        alert("Please paste a meeting transcript.");
        return;
    }

    // -------------------------------
    // 1. Detect Names & Roles
    // -------------------------------
    const people = {
        rajesh: "Project Manager",
        anita: "Marketing Lead",
        vikram: "Engineering Lead",
        pooja: "Operations",
        suresh: "Client Relationship Manager"
    };

    let detectedPeople = {};
    Object.keys(people).forEach(name => {
        if (text.includes(name)) {
            detectedPeople[name] = people[name];
        }
    });

    // -------------------------------
    // 2. Detect Deadline
    // -------------------------------
    function extractDeadline(sentence) {
        if (sentence.includes("today")) return "Today";
        if (sentence.includes("tomorrow") || sentence.includes("tmrw")) return "Tomorrow";

        const dateMatch = sentence.match(/\b(by|on)?\s?\d{1,2}(st|nd|rd|th)?\b/);
        if (dateMatch) return dateMatch[0];

        return "TBD";
    }

    // -------------------------------
    // 3. Sentence-wise Processing
    // -------------------------------
    const sentences = rawText.split(/[.?!]/);
    let actions = [];
    let risks = [];

    sentences.forEach(sentence => {
        const s = sentence.toLowerCase();

        // Identify owner from sentence
        let owner = "Unassigned";
        Object.keys(detectedPeople).forEach(name => {
            if (s.includes(name)) {
                owner = `${name.charAt(0).toUpperCase() + name.slice(1)} (${detectedPeople[name]})`;
            }
        });

        const deadline = extractDeadline(s);

        // Engineering actions
        if (s.includes("test") || s.includes("bug") || s.includes("build")) {
            actions.push([
                "Complete pending engineering work",
                owner,
                deadline,
                "High"
            ]);
            risks.push("Product quality risk");
        }

        // Client actions
        if (s.includes("client")) {
            actions.push([
                "Update client on current status",
                owner,
                deadline,
                "High"
            ]);
            risks.push("Client dissatisfaction risk");
        }

        // Marketing actions
        if (s.includes("marketing")) {
            actions.push([
                "Align marketing communication",
                owner,
                deadline,
                "Medium"
            ]);
        }

        // Operations / vendor actions
        if (s.includes("vendor") || s.includes("operations")) {
            actions.push([
                "Coordinate with vendors on timelines",
                owner,
                deadline,
                "Medium"
            ]);
            risks.push("Operational cost risk");
        }

        // Delay risk
        if (s.includes("delay") || s.includes("late")) {
            risks.push("Project timeline slippage");
        }
    });

    // -------------------------------
    // 4. Generate MoM
    // -------------------------------
    document.getElementById("mom").innerHTML = `
        <strong>Meeting Purpose:</strong> Review project status and align next steps.<br><br>

        <strong>Participants Identified:</strong>
        <ul>
            ${Object.keys(detectedPeople).map(p => `<li>${p.charAt(0).toUpperCase() + p.slice(1)} – ${detectedPeople[p]}</li>`).join("")}
        </ul>

        <strong>Key Risks Identified:</strong>
        <ul>
            ${[...new Set(risks)].map(r => `<li>${r}</li>`).join("") || "<li>No major risks identified</li>"}
        </ul>

        <strong>Summary:</strong>
        <ul>
            <li>Discussion focused on delivery timelines, dependencies, and ownership</li>
            <li>Multiple action items were identified for follow-up</li>
        </ul>
    `;

    // -------------------------------
    // 5. Generate Action Notes Table
    // -------------------------------
    const tableBody = document.querySelector("#actions tbody");
    tableBody.innerHTML = "";

    if (actions.length === 0) {
        actions.push([
            "Review meeting outcomes and define next steps",
            "Unassigned",
            "TBD",
            "Low"
        ]);
    }

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
