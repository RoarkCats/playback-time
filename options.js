// Saves options to chrome.storage
const saveOptions = () => {
    const style = document.getElementById('option_style').value;

    chrome.storage.sync.set(
        { style: Number(style) },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.classList.add('fade-show');
            setTimeout(() => {
                status.classList.remove('fade-show');
            }, 750);
        }
    );    
};

// Loads options from chrome.storage
const loadOptions = () => {

    chrome.storage.sync.get(
        { style: 1 }, // defaults ?
        (items) => {
            document.getElementById('option_style').value = items.style;
        }
    );
};

// load saved settings
document.addEventListener('DOMContentLoaded', loadOptions);
// auto save changes
document.querySelectorAll('.option').forEach(obj => {
    obj.addEventListener('change', saveOptions);
})