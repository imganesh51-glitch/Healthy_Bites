import Image from 'next/image';
import { siteConfig } from '../../lib/data';

export default function StoryPage() {
    return (
        <div>
            <section style={{
                backgroundColor: 'var(--color-secondary)',
                padding: '6rem 0',
                textAlign: 'center',
                paddingTop: '8rem' // Extra padding for navbar
            }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#004d40' }}>Our Story</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', color: '#006644', lineHeight: 1.6 }}>
                    Aaditya's Healthy Bites was born from a simple idea: that every baby deserves the purest start in life.
                </p>
            </section>

            <section className="container" style={{ padding: '6rem 0', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Why We Started</h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--color-text-light)' }}>
                        "At Aaditya’s Healthy Bites, we understand the importance of nutrition in a child’s early years. Our products are designed to provide wholesome goodness using only the finest organic millet, A2 Ghee, and nutrient-dense nuts and seeds powder."
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--color-text-light)' }}>
                        Our recipes are carefully crafted to ensure maximum nutritional value, without compromising on taste or texture. Choose Aaditya’s Healthy Bites for a Healthier Happier Baby.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)' }}>Mrs. Ambika Mahesh Biradar</h4>
                        <p style={{ color: 'var(--color-text-light)' }}>Founder and CEO</p>
                    </div>
                </div>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative', height: '500px', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                    <Image
                        src={siteConfig?.founderImage || '/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM.jpeg'}
                        alt="Aaditya's Healthy Bites Story"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </section>

            <section style={{ background: '#fff', padding: '6rem 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Our Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { title: 'Transparency', desc: 'We list every single ingredient on the front of the jar. No secrets.' },
                            { title: 'Sustainability', desc: 'Our jars are 100% recyclable and we source locally to reduce our carbon footprint.' },
                            { title: 'Taste First', desc: 'We believe babies should enjoy their food. We taste-test every batch.' }
                        ].map((value, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'var(--color-bg)',
                                    borderRadius: '50%',
                                    margin: '0 auto 1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 700
                                }}>
                                    {i + 1}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{value.title}</h3>
                                <p style={{ color: 'var(--color-text-light)' }}>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
