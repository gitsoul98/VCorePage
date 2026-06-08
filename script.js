//  <script>

        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
        const btn = document.getElementById('themeBtn');

        btn.addEventListener('click', function () {

            const isLightTheme = document.body.classList.contains('light-theme');

            const overlay = document.createElement('div');

            overlay.classList.add('theme-overlay');

            if (isLightTheme) {

                // LIGHT -> DARK
                // Start from Bottom Right

                overlay.style.left = window.innerWidth + 'px';
                overlay.style.top = window.innerHeight + 'px';

                overlay.style.background =
                    'radial-gradient(circle, #0f172a, #1e293b, #020617)';
            }
            else {

                // DARK -> LIGHT
                // Start from Bottom Left

                overlay.style.left = '0px';
                overlay.style.top = window.innerHeight + 'px';

                overlay.style.background =
                    'radial-gradient(circle, #ffffff, #e2e8f0, #cbd5e1)';
            }

            document.body.appendChild(overlay);

            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });

            setTimeout(() => {

                document.body.classList.toggle('light-theme');

                if (document.body.classList.contains('light-theme')) {

                    localStorage.setItem('theme', 'light');

                } else {

                    localStorage.setItem('theme', 'dark');
                }

            }, 150);

            setTimeout(() => {
                overlay.remove();
            }, 750);

        });

        const demoData = [

            {
                id: "1001",
                customer: "Abhi",
                amount: "$150",
                status: "Completed",
                selected: false
            },

            {
                id: "1002",
                customer: "Rahul",
                amount: "$320",
                status: "Pending",
                selected: false
            },

            {
                id: "1003",
                customer: "Aman",
                amount: "$780",
                status: "Completed",
                selected: false
            },

            {
                id: "1004",
                customer: "John",
                amount: "$210",
                status: "Processing",
                selected: false
            },
            {
                id: "1005",
                customer: "Sara",
                amount: "$430",
                status: "Completed",
                selected: false
            },
            {
                id: "1006",
                customer: "Emily",
                amount: "$120",
                status: "Pending",
                selected: false
            },
            {
                id: "1007",
                customer: "Michael",
                amount: "$540",
                status: "Processing",
                selected: false
            },
            {
                id: "1008",
                customer: "David",
                amount: "$260",
                status: "Completed",
                selected: false
            },
            {
                id: "1009",
                customer: "Sophia",
                amount: "$310",
                status: "Pending",
                selected: false
            },
            {
                id: "1010",
                customer: "James",
                amount: "$410",
                status: "Processing",
                selected: false
            },
            {
                id: "1011",
                customer: "Olivia",
                amount: "$220",
                status: "Completed",
                selected: false
            },
            {
                id: "1012",
                customer: "William",
                amount: "$330",
                status: "Pending",
                selected: false
            },
            {
                id: "1013",
                customer: "Ava",
                amount: "$290",
                status: "Processing",
                selected: false
            }

        ];


        const table = $('#UserTable').DataTable({

            data: demoData,

            pageLength: 5,
            lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
            // dom: '<"d-flex flex-wrap justify-content-between align-items-center mb-2"l f>rt<"d-flex flex-wrap justify-content-between align-items-center mt-2"ip>',

            columns: [

                {
                    data: null,
                    responsive: true,

                    autoWidth: false,

                    scrollX: false,
                    orderable: false,

                    searchable: false,

                    render: function (data, type, row) {

                        return ` <input type="checkbox" class="row-checkbox" ${row.selected ? 'checked' : ''}> `;
                    }
                },

                {
                    data: 'id'
                },

                {
                    data: 'customer'
                },

                {
                    data: 'amount'
                },

                {
                    data: 'status',

                    render: function (data) {

                        if (data === 'Completed') {
                            return `<span class="status-badge status-completed">${data}</span>`;
                        }

                        if (data === 'Pending') {
                            return `<span class="status-badge status-pending">${data}</span>`;
                        }

                        return `<span class="status-badge status-processing">${data}</span>`;
                    }
                },

                {
                    data: null,

                    orderable: false,

                    render: function (data, type, row) {

                        return `

                    <div class="action-group">

                        <button class="action-btn view-btn" data-id="${row.id}">
                            <i class="fa-regular fa-eye"></i>
                        </button>

                        <button class="action-btn edit-btn" data-id="${row.id}">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button class="action-btn delete-btn" data-id="${row.id}">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

                    </div>

                `;
                    }
                }
            ],

            createdRow: function (row) {

                $('td:eq(0)', row).css({
                    width: '50px'
                });
            }
        });

        function updateSelection() {

            const selectedCount =
                demoData.filter(x => x.selected).length;

            $('#selectedCount').text(selectedCount);

            if (selectedCount > 0) {

                $('#bulkToolbar').css('display', 'flex');

            } else {

                $('#bulkToolbar').hide();
            }

            const visibleRows =
                table.rows({ page: 'current' })
                    .data()
                    .toArray();

            const allSelected =
                visibleRows.length > 0 &&
                visibleRows.every(x => x.selected);
            $('#selectAll').prop(
                'checked',
                allSelected
            );
        }
        // [Column Visibility▼] [Export▼] // Custom Buttons
        $('.dataTables_filter').append(`

<div class="tool-wrapper">

    <button id="columnBtn">
         ⚙ Columns ▼
    </button>

    <div id="columnMenu" class="tool-menu">

    </div>

</div>

<div class="tool-wrapper">

    <button id="exportBtn">
        ⬇ Export ▼
    </button>

    <div id="exportMenu" class="tool-menu">

        <div data-type="pdf"><i class="fas fa-file-pdf"></i> PDF</div>
        <div data-type="csv"><i class="fas fa-file-csv"></i> CSV</div>
        <div data-type="excel"><i class="fas fa-file-excel"></i> Excel</div>
        <div data-type="copy"><i class="fas fa-copy"></i> Copy</div>
        <div data-type="print"><i class="fas fa-print"></i> Print</div>

    </div>

</div>

`);

        $('#columnBtn').click(function (e) {

            e.stopPropagation();

            $('#columnMenu').toggle();

            $('#exportMenu').hide();

        });

        $('#exportBtn').click(function (e) {

            e.stopPropagation();

            $('#exportMenu').toggle();

            $('#columnMenu').hide();

        });

        $(document).on('click', function (e) {

            if (!$(e.target).closest('.tool-wrapper').length) {

                $('#columnMenu').hide();

                $('#exportMenu').hide();
            }

        });
        // Custom Buttons end [Column Visibility▼] [Export▼]

        // LOAD COLUMN TOGGLE MENU

        function loadColumns() {

            let html = '';

            table.columns().every(function (index) {

                // Skip Checkbox Column
                if (index === 0)
                    return;

                // Skip Action Column
                if (index === 5)
                    return;

                const title =
                    $(this.header()).text().trim();

                html += `
            <div>

                <label style="cursor:pointer;">

                    <input
                        type="checkbox"
                        class="column-toggle"
                        data-column="${index}"
                        checked>

                    ${title}

                </label>

            </div>
        `;
            });

            $('#columnMenu').html(html);
        }

        loadColumns();

        $(document).on(
            'change',
            '.column-toggle',
            function () {

                const columnIndex =
                    $(this).data('column');

                table
                    .column(columnIndex)
                    .visible(this.checked);
            }
        );

        // LOAD COLUMN TOGGLE MENU END


        $(document).on('click', '#exportMenu div', function () {

            const type = $(this).data('type');

            if (type === 'copy') {

                navigator.clipboard.writeText(
                    JSON.stringify(demoData, null, 2)
                );

                // Swal.fire({

                //     icon: 'success',

                //     title: 'Copied!',

                //     confirmButtonText: 'OK',
                //     confirmButtonColor: '#14b8a6',
                //     text: 'Data copied successfully',

                //     showConfirmButton: true,

                //     // timer: 1500,

                //     // timerProgressBar: true
                // });
                showToast(
                    'Data copied successfully'
                );

                $('#exportMenu').hide();
            }
        });

        // buttons: [
        //     {
        //         extend: 'copy',
        //         className: 'buttons-copy-hidden'
        //     }
        // ]

        // if(type === 'copy'){
        //     table.button('.buttons-copy-hidden').trigger();
        // }
        // Copy Button Click 

        // Copy Button Click End 


        /* SELECT ALL */

        $(document).on(
            'change',
            '#selectAll',
            function () {

                const checked = this.checked;

                table.rows({ page: 'current' }).every(function () {

                    const rowData = this.data();

                    rowData.selected = checked;

                    const node = $(this.node());

                    node.find('.row-checkbox')
                        .prop('checked', checked);

                    if (checked) {

                        node.addClass('row-selected');

                    } else {

                        node.removeClass('row-selected');
                    }
                });

                updateSelection();
            }
        );

        /* INDIVIDUAL CHECKBOX */

        $(document).on(
            'change',
            '.row-checkbox',
            function () {

                const tr =
                    $(this).closest('tr');

                const row =
                    table.row(tr);

                const rowData =
                    row.data();

                rowData.selected =
                    this.checked;

                if (this.checked) {

                    tr.addClass('row-selected');

                } else {

                    tr.removeClass('row-selected');
                }

                updateSelection();
            }
        );

        /* DATATABLE REDRAW */

        table.on(
            'draw',
            function () {

                table.rows().every(function () {

                    const rowData =
                        this.data();

                    const node =
                        $(this.node());

                    node.find('.row-checkbox')
                        .prop(
                            'checked',
                            rowData.selected
                        );

                    if (rowData.selected) {

                        node.addClass(
                            'row-selected'
                        );

                    } else {

                        node.removeClass(
                            'row-selected'
                        );
                    }
                });

                updateSelection();
            }
        );

        /* ACTIVE */

        $('#activeBtn').click(function () {

            const selectedRows =
                demoData.filter(
                    x => x.selected
                );

            alert(
                selectedRows.length +
                ' rows set Active'
            );
        });

        /* INACTIVE */

        $('#inactiveBtn').click(function () {

            const selectedRows =
                demoData.filter(
                    x => x.selected
                );

            alert(
                selectedRows.length +
                ' rows set Inactive'
            );
        });

        /* ACTIONS */

        function viewData(id) {

            alert(
                'View : ' + id
            );
        }

        function editData(id) {

            alert(
                'Edit : ' + id
            );
        }

        /* INITIAL LOAD */

        updateSelection();


        $('#activeBtn').click(function () {

            alert(
                $('.row-checkbox:checked').length +
                ' rows set Active'
            );
        });

        $('#inactiveBtn').click(function () {

            alert(
                $('.row-checkbox:checked').length +
                ' rows set Inactive'
            );
        });

        function viewData(id) {

            alert("View : " + id);
        }

        function editData(id) {

            alert("Edit : " + id);
        }


        /* VIEW */

        $(document).on('click', '.view-btn', function () {

            const id = $(this).data('id');
            console.log(id);
            const row =
                demoData.find(x => x.id == id);

            $('#viewId').text(row.id);
            $('#viewCustomer').text(row.customer);
            $('#viewAmount').text(row.amount);
            $('#viewStatus').text(row.status);

            $('#viewModal').css('display', 'flex');

            setTimeout(() => {
                $('#viewModal').addClass('show');
            }, 10);
        });

        /* EDIT */

        $(document).on('click', '.edit-btn', function () {

            const id = $(this).data('id');

            const row =
                demoData.find(x => x.id == id);

            $('#editIndex').val(row.id);

            $('#editCustomer').val(row.customer);
            $('#editAmount').val(row.amount);
            $('#editStatus').val(row.status);

            $('#editModal').css('display', 'flex');

            setTimeout(() => {
                $('#editModal').addClass('show');
            }, 10);
        });

        /* CLOSE */
        function closeModal(id) {

            const modal = $(id);

            modal.removeClass('show');

            setTimeout(() => {

                modal.css('display', 'none');

            }, 280);
        }

        $(document).on('click', '.modal-close', function () {

            const modalId =
                '#' +
                $(this)
                    .closest('.modal-overlay')
                    .attr('id');

            closeModal(modalId);
        });

        $(document).on('click', '.modal-overlay', function (e) {

            if ($(e.target).hasClass('modal-overlay')) {

                $(this).hide();
            }
        });

        $('#saveEditBtn').click(function () {

            showConfirmDialog({

                title: 'Update Record?',

                text: 'Do you want to save the changes?',

                type: 'update'

            }).then((result) => {

                if (!result.isConfirmed)
                    return;

                const id = $('#editIndex').val();

                const row = demoData.find(x => x.id == id);

                if (!row) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Record not found'
                    });

                    return;
                }

                row.customer = $('#editCustomer').val();
                row.amount = $('#editAmount').val();
                row.status = $('#editStatus').val();

                // Remove focus first
                if (document.activeElement) {
                    document.activeElement.blur();
                }

                // Refresh table
                table.clear()
                    .rows.add(demoData)
                    .draw(false);

                // Close modal
                closeModal('#editModal');
                document.body.focus();
                // console.log('MODAL CLOSED');

                // console.log('AFTER HIDE');
                // console.log($('#editModal').css('display'));

                // Success message
                setTimeout(() => {

                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Updated!',
                    //     text: 'Record updated successfully.',
                    //     confirmButtonColor: '#14b8a6'
                    // });
                    showToast(
                        'Record updated successfully'
                    );

                }, 100);

            });

        });


        $(document).on('click', '.delete-btn', function () {

            const id = $(this).data('id');

            showConfirmDialog({

                // title: 'Delete Record?',
                // text: 'This action cannot be undone.',
                // icon: 'warning',
                // confirmIcon: 'fa-trash',
                // confirmColor: '#ef4444'

                title: 'Delete Record?',
                text: 'This action cannot be undone.',
                type: 'delete'

            }).then((result) => {

                if (result.isConfirmed) {

                    const index =
                        demoData.findIndex(x => x.id == id);

                    if (index > -1) {

                        demoData.splice(index, 1);

                        table.clear()
                            .rows.add(demoData)
                            .draw(false);
                    }

                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Deleted!',
                    //     text: 'Record deleted successfully.',
                    //     confirmButtonColor: '#14b8a6'
                    // });
                    showToast(
                        'Record deleted successfully'
                    );
                }
            });
        });

        /* NEW ADD BUTTON LOGIC */

        // Open Modal
        $('#btnAddUser').click(function () {

            $('#addModal').css('display', 'flex');

            setTimeout(() => {

                $('#addModal').addClass('show');

            }, 10);

        });

        // Close Modal Animation

        function closeModal(modalId) {

            const modal = $(modalId);

            modal.removeClass('show');

            setTimeout(() => {

                modal.css('display', 'none');

            }, 280);
        }
        //Close Button
        $(document).on('click', '.modal-close', function () {

            const modalId =
                '#' +
                $(this)
                    .closest('.modal-overlay')
                    .attr('id');

            closeModal(modalId);
        });


        //Save User
        $('#saveAddBtn').click(function () {

            const customer = $('#addCustomer').val();

            const amount = $('#addAmount').val();

            const status = $('#addStatus').val();

            if (!customer || !amount) {

                // Swal.fire({
                //     icon: 'warning',
                //     title: 'Required',
                //     text: 'Please fill all fields'
                // });
                showToast(
                    'Please fill all fields',
                    'warning'
                );

                return;
            }

            showConfirmDialog({
                title: 'Add New Record?',

                text: 'Do you want to save this new record?',

                type: 'add'

            }).then((result) => {

                if (!result.isConfirmed)
                    return;

                demoData.unshift({

                    id: String(
                        parseInt(demoData[0].id) + 1
                    ),

                    customer: customer,

                    amount: amount,

                    status: status,

                    selected: false

                });

                table.clear()
                    .rows.add(demoData)
                    .draw(false);

                closeModal('#addModal');

                $('#addCustomer').val('');
                $('#addAmount').val('');
                $('#addStatus').val('Completed');

                // Swal.fire({

                //     icon: 'success',

                //     title: 'Added!',

                //     text: 'Record added successfully.',

                //     confirmButtonColor: '#14b8a6'

                // });
                showToast(
                    'Record added successfully'
                );

            });

        });

        function showToast(message, type = 'success') {

            let bgColor = '#14b8a6';

            if (type === 'error') {
                bgColor = '#ef4444';
            }

            if (type === 'warning') {
                bgColor = '#f59e0b';
            }

            if (type === 'info') {
                bgColor = '#3b82f6';
            }

            Toastify({

                text: message,

                duration: 3000,

                gravity: "bottom",

                position: "right",

                close: true,

                stopOnFocus: true,

                style: {
                    background: bgColor,
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "500"
                }

            }).showToast();

        }


        function showConfirmDialog({

            title,

            text,

            type = 'update'

        }) {

            let icon = 'question';

            let confirmIcon = 'fa-check';

            let confirmColor = '#14b8a6';

            switch (type.toLowerCase()) {

                case 'add':

                    icon = 'question';

                    confirmIcon = 'fa-check';

                    confirmColor = '#14b8a6';

                    break;

                case 'update':

                    icon = 'question';

                    confirmIcon = 'fa-check';

                    confirmColor = '#14b8a6';

                    break;

                case 'delete':

                    icon = 'warning';

                    confirmIcon = 'fa-trash';

                    confirmColor = '#ef4444';

                    break;

                case 'activate':

                    icon = 'success';

                    confirmIcon = 'fa-check';

                    confirmColor = '#22c55e';

                    break;

                case 'deactivate':

                    icon = 'warning';

                    confirmIcon = 'fa-ban';

                    confirmColor = '#f59e0b';

                    break;

                case 'save':

                    icon = 'question';

                    confirmIcon = 'fa-floppy-disk';

                    confirmColor = '#14b8a6';

                    break;
            }

            return Swal.fire({

                title,

                text,

                icon,

                width: '320px',

                allowOutsideClick: true,

                allowEscapeKey: true,

                showCancelButton: true,

                reverseButtons: true,

                confirmButtonText:
                    `<i class="fa-solid ${confirmIcon}"></i>`,

                cancelButtonText:
                    '<i class="fa-solid fa-xmark"></i>',

                confirmButtonColor: confirmColor,

                cancelButtonColor: '#64748b',

                customClass: {
                    popup: 'vcore-confirm-popup'
                }
            });
        }

        /*
        
        Bulk Activate

        showConfirmDialog({

    title: 'Activate Records?',

    text: 'Selected records will be activated.',

    type: 'activate'

})


Bulk Inactive

showConfirmDialog({

    title: 'Deactivate Records?',

    text: 'Selected records will be deactivated.',

    type: 'deactivate'

})
        */
    {/* </script> */}