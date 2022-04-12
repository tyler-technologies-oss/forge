(function () {
    var example = document.querySelector('#FilePicker');
    var filePicker = example.querySelector('#file-picker-default');
    var filePickerCompact = example.querySelector('#file-picker-compact');
    var filePickerBorderless = example.querySelector('#file-picker-borderless');
    var filePickerHelperText = example.querySelector('#file-picker-helper-text');
    var list = example.querySelector('#file-picker-list');
    var listCompact = example.querySelector('#file-picker-list-compact');
    var listBorderless = example.querySelector('#file-picker-list-borderless');
    var multipleCheckbox = example.querySelector('#file-picker-multiple');
    var disabledCheckbox = example.querySelector('#file-picker-disabled');
    var acceptTextField = example.querySelector('#file-picker-accept');
    var maxSizeTextField = example.querySelector('#file-picker-max-size');

    filePicker.addEventListener('forge-file-picker-change', function (evt) {
        console.log(evt.detail);
        filePickerHelperText.innerText = evt.detail.legalFiles.length.toString() + ' file(s)';
        list.innerHTML = '';
        for (let i = 0; i < evt.detail.legalFiles.length; i++) {
            const li = document.createElement('li');
            li.innerText = evt.detail.legalFiles[i].name;
            list.appendChild(li);
        }
    });

    filePickerCompact.addEventListener('forge-file-picker-change', function (evt) {
        listCompact.innerHTML = '';
        for (let i = 0; i < evt.detail.legalFiles.length; i++) {
            const li = document.createElement('li');
            li.innerText = evt.detail.legalFiles[i].name;
            listCompact.appendChild(li);
        }
    });

    filePickerBorderless.addEventListener('forge-file-picker-change', function (evt) {
        listBorderless.innerHTML = '';
        for (let i = 0; i < evt.detail.legalFiles.length; i++) {
            const li = document.createElement('li');
            li.innerText = evt.detail.legalFiles[i].name;
            listBorderless.appendChild(li);
        }
    });

    multipleCheckbox.checked = false;
    multipleCheckbox.addEventListener('change', function () {
        filePicker.multiple = multipleCheckbox.checked;
        filePickerCompact.multiple = multipleCheckbox.checked;
    });

    disabledCheckbox.checked = false;
    disabledCheckbox.addEventListener('change', function () {
        filePicker.disabled = disabledCheckbox.checked;
        filePickerCompact.disabled = disabledCheckbox.checked;
    });

    acceptTextField.value = '';
    acceptTextField.addEventListener('change', function () {
        filePicker.accept = acceptTextField.value;
        filePickerCompact.accept = acceptTextField.value;
    });

    maxSizeTextField.value = '';
    maxSizeTextField.addEventListener('change', function () {
        filePicker.maxSize = maxSizeTextField.value;
        filePickerCompact.maxSize = maxSizeTextField.value;
    });
})();