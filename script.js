function previewImg(input) {
      const preview = document.getElementById('avatarPreview');
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function submitForm() {
      const get = id => document.getElementById(id);
      const fullname   = get('fullname').value.trim()   || '—';
      const username   = get('username').value.trim()   || '—';
      const telephone  = get('telephone').value.trim()  || '—';
      const birthday   = get('birthday').value          || '—';
      const favcolor   = get('favcolor').value;
      const country    = get('country').value           || '—';
      const email      = get('email').value.trim()      || '—';
      const spirit     = get('spirit').value;

      const animal     = document.querySelector('input[name="animal"]:checked')?.value  || '—';
      const hobbies    = [...document.querySelectorAll('input[name="hobbies"]:checked')].map(i=>i.value);
      const avatarSrc  = get('avatarPreview').src;

      get('pName').textContent    = fullname;
      get('pNick').textContent    = '@' + (username || '—');
      get('pUsername').textContent = username;
      get('pPhone').textContent   = telephone;
      get('pBirthday').textContent = birthday !== '—' ? formatDate(birthday) : '—';
      get('pColor').innerHTML     = favcolor + `<span class="profile-color-dot" style="background:${favcolor}"></span>`;
      get('pCountry').textContent = country;
      get('pEmail').textContent   = email;
      get('pAnimal').textContent  = animal;
      get('pSpiritTxt').textContent = spirit + ' / 100';

      const hobbyEl = get('pHobbies');
      hobbyEl.innerHTML = hobbies.length ? hobbies.map(h=>`<span class="tag">${h}</span>`).join('') : '<span style="color:var(--cream-dim)">None selected</span>';

      const avatarImg = get('profilePic');
      const avatarFallback = get('profilePicFallback');
      if (avatarSrc && avatarSrc.startsWith('data:')) {
        avatarImg.src = avatarSrc;
        avatarImg.style.display = 'block';
        avatarFallback.style.display = 'none';
      } else {
        avatarImg.removeAttribute('src');
        avatarImg.style.display = 'none';
        avatarFallback.style.display = 'grid';
      }

      get('formPage').classList.remove('active');
      get('profilePage').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function formatDate(d) {
      if (!d) return '—';
      const [y, m, day] = d.split('-');
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
    }