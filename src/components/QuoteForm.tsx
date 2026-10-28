type Labels = {formTitle:string; name:string; email:string; phone:string; company:string; country:string; message:string; submit:string; helper:string};

export function QuoteForm({labels}: {labels: Labels}) {
  return <form className="form-card quote-form" action="https://formsubmit.co/li1161870900@gmail.com" method="POST">
    <input type="hidden" name="_subject" value="New GEELUNG Website Inquiry" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_next" value="https://www.geelung.com/thank-you" />
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none'}} />
    <p className="eyebrow">GEELUNG · RFQ</p><h2>{labels.formTitle}</h2><p className="form-helper">{labels.helper}</p>
    <div className="form-grid">
      <label><span>{labels.name} <b>*</b></span><input name="name" required autoComplete="name" placeholder={labels.name} /></label>
      <label><span>{labels.email} <b>*</b></span><input name="email" type="email" required autoComplete="email" placeholder={labels.email} /></label>
      <label><span>{labels.phone} <b>*</b></span><input name="phone" type="tel" required autoComplete="tel" pattern="[+0-9() -]{6,}" title="Please enter a valid international phone number" placeholder="+86 159 9689 0066" /></label>
      <label><span>{labels.company}</span><input name="company" autoComplete="organization" placeholder={labels.company} /></label>
      <label><span>{labels.country}</span><input name="country" autoComplete="country-name" placeholder={labels.country} /></label>
      <label className="form-message"><span>{labels.message}</span><textarea name="message" placeholder={labels.message} /></label>
      <button className="button" type="submit">{labels.submit}</button>
    </div>
  </form>;
}
