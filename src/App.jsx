import { useMemo, useState } from 'react';
import Header from './components/Header';
import SectionHeading from './components/SectionHeading';
import { campusData } from './data/campusData';
import './App.css';

const flattenedPrograms = campusData.departments.flatMap((department) =>
  department.programs.map((program) => ({ ...program, department: department.name })),
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [programSearch, setProgramSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');

  const departmentFilters = ['All', ...campusData.departments.map((department) => department.name)];
  const eventFilters = ['All', ...new Set(campusData.events.map((event) => event.category))];

  const filteredPrograms = useMemo(
    () =>
      flattenedPrograms.filter((program) => {
        const matchesSearch = program.name.toLowerCase().includes(programSearch.toLowerCase());
        const matchesDepartment = programFilter === 'All' || program.department === programFilter;
        return matchesSearch && matchesDepartment;
      }),
    [programFilter, programSearch],
  );

  const filteredEvents = useMemo(
    () =>
      campusData.events.filter((event) => eventFilter === 'All' || event.category === eventFilter),
    [eventFilter],
  );

  const validateContactForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'Message is required.';

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateContactForm();

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormStatus('error');
      return;
    }

    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="app">
      <Header links={campusData.navLinks} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="section-eyebrow">Welcome to {campusData.campusName}</p>
            <h1>{campusData.hero.title}</h1>
            <p>{campusData.hero.subtitle}</p>
            <div className="hero-actions">
              <a className="button primary" href={campusData.hero.primaryCta.href}>
                {campusData.hero.primaryCta.label}
              </a>
              <a className="button secondary" href={campusData.hero.secondaryCta.href}>
                {campusData.hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="stats-grid" aria-label="Campus statistics">
            {campusData.stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section highlights" aria-label="Campus highlights">
          {campusData.highlights.map((highlight) => (
            <article key={highlight} className="highlight-card">
              <p>{highlight}</p>
            </article>
          ))}
        </section>

        <section id="about" className="section">
          <SectionHeading
            eyebrow="About Campus"
            title="Mission, Vision, and Values"
            description="Built on a learner-first culture, we blend academic rigor with practical impact."
          />
          <div className="cards-grid two-col">
            <article className="card">
              <h3>Mission</h3>
              <p>{campusData.about.mission}</p>
            </article>
            <article className="card">
              <h3>Vision</h3>
              <p>{campusData.about.vision}</p>
            </article>
            <article className="card">
              <h3>History</h3>
              <p>{campusData.about.history}</p>
            </article>
            <article className="card">
              <h3>Values</h3>
              <ul>
                {campusData.about.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="inline-list">
            {campusData.about.campusHighlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section id="academics" className="section">
          <SectionHeading
            eyebrow="Departments & Programs"
            title="Find the Right Academic Path"
            description="Browse departments and quickly filter programs by area or keyword."
          />
          <div className="filter-row">
            <label htmlFor="program-search">Search Programs</label>
            <input
              id="program-search"
              type="search"
              value={programSearch}
              onChange={(event) => setProgramSearch(event.target.value)}
              placeholder="e.g. Data Engineering"
            />
            <label htmlFor="program-filter">Department</label>
            <select
              id="program-filter"
              value={programFilter}
              onChange={(event) => setProgramFilter(event.target.value)}
            >
              {departmentFilters.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="cards-grid three-col">
            {filteredPrograms.map((program) => (
              <article key={`${program.department}-${program.name}`} className="card">
                <p className="tag">{program.department}</p>
                <h3>{program.name}</h3>
                <p>{program.level}</p>
                <p>{program.duration}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faculty" className="section">
          <SectionHeading
            eyebrow="Faculty & Staff"
            title="Meet Our Campus Leaders"
            description="Connect with educators and staff supporting student growth."
          />
          <div className="cards-grid two-col">
            {campusData.faculty.map((member) => (
              <article key={member.email} className="card">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.department}</p>
                <p>Expertise: {member.expertise}</p>
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </article>
            ))}
          </div>
        </section>

        <section id="admissions" className="section">
          <SectionHeading
            eyebrow="Admissions"
            title="Apply in Four Clear Steps"
            description="Everything you need to prepare a successful application."
          />
          <div className="cards-grid three-col">
            <article className="card">
              <h3>Application Steps</h3>
              <ol>
                {campusData.admissions.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
            <article className="card">
              <h3>Requirements</h3>
              <ul>
                {campusData.admissions.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Important Dates</h3>
              <ul>
                {campusData.admissions.deadlines.map((deadline) => (
                  <li key={deadline.label}>
                    <strong>{deadline.label}:</strong> {deadline.date}
                  </li>
                ))}
              </ul>
              <a className="button primary block" href="#contact">
                Start Application Support
              </a>
            </article>
          </div>
        </section>

        <section id="events" className="section">
          <SectionHeading
            eyebrow="Events & Announcements"
            title="What&apos;s Happening on Campus"
            description="Filter events by category to discover activities and opportunities."
          />
          <div className="filter-buttons" role="group" aria-label="Filter events by category">
            {eventFilters.map((category) => (
              <button
                type="button"
                key={category}
                className={eventFilter === category ? 'active' : ''}
                onClick={() => setEventFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="cards-grid two-col">
            {filteredEvents.map((event) => (
              <article key={event.title} className="card">
                <p className="tag">{event.category}</p>
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="student-life" className="section">
          <SectionHeading
            eyebrow="Student Life"
            title="A Campus Experience Beyond the Classroom"
            description="Community, wellness, and activities designed for an enriching student journey."
          />
          <div className="cards-grid three-col">
            <article className="card">
              <h3>Clubs & Activities</h3>
              <ul>
                {campusData.studentLife.clubs.map((club) => (
                  <li key={club}>{club}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Facilities</h3>
              <ul>
                {campusData.studentLife.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Housing & Transport</h3>
              <p>{campusData.studentLife.housingTransport}</p>
            </article>
          </div>
        </section>

        <section id="gallery" className="section">
          <SectionHeading
            eyebrow="Campus Gallery"
            title="Explore Spaces That Inspire"
            description="A quick look into life and learning at Greenfield University."
          />
          <div className="gallery-grid">
            {campusData.gallery.map((item) => (
              <article key={item.title} className="gallery-card">
                <img src={item.image} alt={item.title} loading="lazy" />
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <SectionHeading
            eyebrow="Contact"
            title="Connect With Admissions & Student Services"
            description="Have questions? Send us a message and our team will respond shortly."
          />
          <div className="cards-grid two-col">
            <article className="card">
              <h3>Contact Information</h3>
              <p>{campusData.contact.address}</p>
              <p>
                <a href={`tel:${campusData.contact.phone}`}>{campusData.contact.phone}</a>
              </p>
              <p>
                <a href={`mailto:${campusData.contact.email}`}>{campusData.contact.email}</a>
              </p>
              <p>{campusData.contact.officeHours}</p>
              <div className="map-placeholder" role="img" aria-label="Map placeholder for campus location">
                Map and location integration ready
              </div>
            </article>

            <article className="card">
              <h3>Contact Form</h3>
              <form noValidate onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  aria-invalid={Boolean(formErrors.name)}
                />
                {formErrors.name && <p className="form-error">{formErrors.name}</p>}

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email && <p className="form-error">{formErrors.email}</p>}

                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  aria-invalid={Boolean(formErrors.message)}
                />
                {formErrors.message && <p className="form-error">{formErrors.message}</p>}

                <button type="submit" className="button primary block">
                  Send Message
                </button>
                {formStatus === 'success' && (
                  <p className="form-success">Thanks! Your message has been submitted successfully.</p>
                )}
                {formStatus === 'error' && <p className="form-error">Please resolve the highlighted errors.</p>}
              </form>
            </article>
          </div>
        </section>

        <section id="portals" className="section">
          <SectionHeading
            eyebrow="Portal Access"
            title="Student & Faculty Login"
            description="Use the portal cards below to access your dedicated dashboard."
          />
          <div className="cards-grid two-col">
            {campusData.portals.map((portal) => (
              <article key={portal.title} className="card portal-card">
                <h3>{portal.title}</h3>
                <p>{portal.description}</p>
                <button type="button" className="button secondary block">
                  {portal.action}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
