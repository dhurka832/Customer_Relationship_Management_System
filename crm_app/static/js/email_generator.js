// Email Generator JavaScript
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function onLeadSelectChange(elem) {
    const selectedOpt = elem.options[elem.selectedIndex];
    const custId = selectedOpt.getAttribute('data-customer-id');
    if (custId) {
        document.getElementById('customerSelect').value = custId;
    }
}

async function handleGenerateEmail(e) {
    e.preventDefault();
    const leadId = document.getElementById('leadSelect').value;
    const customerId = document.getElementById('customerSelect').value;
    const goal = document.getElementById('goalSelect').value;
    const tone = document.getElementById('toneSelect').value;
    const extraNotes = document.getElementById('extraNotes').value;

    if (!leadId && !customerId) {
        alert('Please select a Lead or Customer first.');
        return;
    }

    document.getElementById('placeholderBox').classList.add('d-none');
    document.getElementById('resultBox').classList.add('d-none');
    document.getElementById('loadingBox').classList.remove('d-none');
    document.getElementById('generateBtn').disabled = true;

    try {
        const response = await fetch("{% url 'generate-email-api' %}", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie('csrftoken')
            },
            body: JSON.stringify({
                lead_id: leadId,
                customer_id: customerId,
                goal: goal,
                tone: tone,
                extra_notes: extraNotes
            })
        });

        const data = await response.json();
        document.getElementById('loadingBox').classList.add('d-none');

        if (data.subject && data.body) {
            document.getElementById('resSubject').textContent = data.subject;
            document.getElementById('resBody').textContent = data.body;
            const mailto = `mailto:?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
            document.getElementById('mailtoLink').setAttribute('href', mailto);
            document.getElementById('resultBox').classList.remove('d-none');
        } else {
            alert('Error generating email: ' + (data.error || 'Unknown error'));
            document.getElementById('placeholderBox').classList.remove('d-none');
        }
    } catch (err) {
        document.getElementById('loadingBox').classList.add('d-none');
        document.getElementById('placeholderBox').classList.remove('d-none');
        alert('Failed to connect to server.');
    } finally {
        document.getElementById('generateBtn').disabled = false;
    }
}

function copySubject() {
    const text = document.getElementById('resSubject').textContent;
    navigator.clipboard.writeText(text);
    alert('Subject copied to clipboard!');
}

function copyBody() {
    const text = document.getElementById('resBody').textContent;
    navigator.clipboard.writeText(text);
    alert('Email body copied to clipboard!');
}
