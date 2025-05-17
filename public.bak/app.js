document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(s => s.style.display = 'none');
      document.getElementById(btn.dataset.section).style.display = 'block';
      const sec = btn.dataset.section;
      if (sec === 'chat') {/* no data */}
      if (sec === 'customers') loadData('customers');
      if (sec === 'employees') loadData('employees');
      if (sec === 'positions') loadData('positions');
      if (sec === 'roles') loadData('roles');
      if (sec === 'assets') loadData('assets');
    });
  });
  // default
  document.querySelector('nav button').click();
  
  function loadData(sec) {
    axios.get('/api/' + sec).then(res => {
      const list = document.getElementById('list-' + sec);
      list.innerHTML = '';
      res.data.forEach(item => {
        list.innerHTML += '<li>' + (item.name || item.username || item.title) + '</li>';
      });
    });
  }
  
  // Input Customer
  document.getElementById('form-customers').onsubmit = async e => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      name: e.target.name.value
    };
    const res = await axios.post('/api/customers', data);
    document.getElementById('cust-msg').textContent = 'Added ' + res.data.name;
    loadData('customers');
    e.target.reset();
  };
  
  // Import/Export
  document.getElementById('export-customers').onclick = () => {
    window.open('/api/export/customers', '_blank');
  };
  document.getElementById('import-btn').onclick = async () => {
    const file = document.getElementById('import-file').files[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const res = await axios.post('/api/import/customers', form);
    document.getElementById('import-msg').textContent = res.data.message;
    loadData('customers');
  };
});
