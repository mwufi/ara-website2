export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-5xl font-serif font-light leading-[1.2] tracking-[-0.02em] mb-8 mt-12">Terms of Service</h1>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    <strong>Last updated: January 2025</strong>
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Agreement to Terms</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    By using Ara Intelligence's services, you agree to these terms. If you don't agree, please don't use our services.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Description of Service</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    Ara Intelligence provides AI-powered tools and services, including email assistance and other AI capabilities. Our services may integrate with third-party platforms like Google Workspace.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Use of Service</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4"><strong>You may:</strong></p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li className="text-lg leading-relaxed">Use our services for lawful business and personal purposes</li>
                    <li className="text-lg leading-relaxed">Create content using our AI tools</li>
                    <li className="text-lg leading-relaxed">Share outputs you create (subject to our guidelines)</li>
                </ul>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4"><strong>You may not:</strong></p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li className="text-lg leading-relaxed">Use our services for illegal activities</li>
                    <li className="text-lg leading-relaxed">Attempt to reverse engineer our technology</li>
                    <li className="text-lg leading-relaxed">Violate others' intellectual property rights</li>
                    <li className="text-lg leading-relaxed">Use our services to create harmful or misleading content</li>
                </ul>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Your Content and Data</h2>

                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li className="text-lg leading-relaxed">You own the content you create using our services</li>
                    <li className="text-lg leading-relaxed">You're responsible for the content you input and create</li>
                    <li className="text-lg leading-relaxed">We may use your inputs to improve our services (anonymized)</li>
                    <li className="text-lg leading-relaxed">We don't claim ownership of your personal data or creations</li>
                </ul>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Google Workspace Integration</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    <strong>Important:</strong> We explicitly affirm that Google Workspace APIs are not used to develop, improve, or train generalized AI and/or ML models. Our use of Google Workspace APIs is strictly limited to providing email assistance and related functionality to you as the user.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Privacy</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    Your privacy is important to us. Please review our <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline transition-colors">Privacy Policy</a> to understand how we collect, use, and protect your information.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Service Availability</h2>

                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li className="text-lg leading-relaxed">We aim to provide reliable service but can't guarantee 100% uptime</li>
                    <li className="text-lg leading-relaxed">We may need to suspend service for maintenance</li>
                    <li className="text-lg leading-relaxed">We reserve the right to modify or discontinue features</li>
                </ul>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Account Termination</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    We may suspend or terminate accounts that violate these terms. You can close your account at any time.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Limitation of Liability</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    Our services are provided "as is." We're not liable for any indirect damages or losses from using our services.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Changes to Terms</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    We may update these terms occasionally. Continued use of our services means you accept any changes.
                </p>

                <h2 className="text-4xl font-serif font-light leading-[1.3] tracking-[-0.01em] mb-6 mt-10">Contact</h2>

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    Questions about these terms? Contact us at legal@ara.computer
                </p>

                <hr className="border-t border-gray-300 my-8" />

                <p className="text-lg font-sans leading-[1.7] tracking-[0.01em] mb-4">
                    © 2025 Ara Intelligence. All rights reserved.
                </p>
            </div>
        </div>
    );
} 