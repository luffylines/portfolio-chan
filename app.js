(()=>{
  const grid=document.querySelector('#projects .project-card-grid');
  if(grid&&!document.querySelector('.ess-project')){
    const ess=document.createElement('article');
    ess.className='crm-project ess-project';
    ess.innerHTML=`
      <div class="project-overline"><span>01 / SELECTED PROJECT</span><span>EMPLOYEE SELF-SERVICE</span></div>
      <div class="crm-gallery">
        <figure>
          <div class="crm-image-window"><img id="ess-preview" src="ESS1.png" alt="Place Of Beauty ESS home page" loading="lazy" width="1366" height="768"></div>
          <figcaption>01 / Home — modern employee self-service landing workspace.</figcaption>
        </figure>
        <div class="crm-views" aria-label="Place Of Beauty ESS screenshots">
          <button type="button" class="crm-view selected" data-image="ESS1.png" data-caption="01 / Home — modern employee self-service landing workspace." data-alt="Place Of Beauty ESS home page" aria-pressed="true" aria-controls="ess-preview">Home</button>
          <button type="button" class="crm-view" data-image="ESS2.png" data-caption="02 / Dashboard — employee workspace with attendance and quick actions." data-alt="Place Of Beauty ESS employee dashboard" aria-pressed="false" aria-controls="ess-preview">Dashboard</button>
          <button type="button" class="crm-view" data-image="ESS3.png" data-caption="03 / About — overview of the employee self-service platform." data-alt="Place Of Beauty ESS about page" aria-pressed="false" aria-controls="ess-preview">About</button>
        </div>
        <p class="crm-announcement" role="status" aria-live="polite"></p>
      </div>
      <div class="crm-heading"><div><span class="eyebrow">WEB APPLICATION</span><h3>Place Of Beauty ESS</h3></div></div>
      <p class="crm-description">A modern Employee Self-Service web application that brings attendance, schedules, leave, overtime, payslips, and employee profile tools into one clear workspace.</p>
      <div class="language-row"><span>Employee self-service</span><span>Attendance &amp; HR</span><span>Responsive dashboard</span></div>
      <details class="project-details">
        <summary>Project details <span>+</span></summary>
        <div class="crm-features">
          <div><span>EXPERIENCE</span><p>A polished public landing page with About, Contact, Terms, System Info, and portal access.</p></div>
          <div><span>WORKDAY</span><p>Employees can review attendance, schedules, leave, overtime, and payslip information from a focused dashboard.</p></div>
          <div><span>PROFILE</span><p>A secure employee workspace designed around account, profile, and day-to-day HR self-service tasks.</p></div>
        </div>
      </details>
      <a class="button" href="https://ess-new-fcgp.onrender.com/" target="_blank" rel="noopener noreferrer">Visit website <span>↗</span></a>`;
    grid.prepend(ess);
    [...grid.querySelectorAll(':scope > .crm-project')].forEach((card,index)=>{
      const label=card.querySelector('.project-overline span:first-child');
      if(label) label.textContent=String(index+1).padStart(2,'0')+label.textContent.replace(/^\d{2}/,'');
    });
  }
  const core=document.createElement('script');
  core.src='app-core.js';
  core.async=false;
  document.body.append(core);
})();
