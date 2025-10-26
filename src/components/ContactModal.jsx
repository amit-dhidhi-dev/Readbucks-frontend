import React from 'react'

function ContactModal({setShowContactModal}) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h3>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                            className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                        >
                            <div className="font-semibold">📧 Email Support</div>
                            <div className="text-sm text-gray-600">{import.meta.env.VITE_CONTACT_EMAIL}</div>
                            <div className="text-xs text-gray-500">Response within 24 hours</div>
                        </button>

                        <button
                            onClick={() => window.open(`tel:+91-${import.meta.env.VITE_PHONE}`)}
                            className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                        >
                            <div className="font-semibold">📞 Phone Support</div>
                            <div className="text-sm text-gray-600">+91-{import.meta.env.VITE_PHONE}</div>
                            <div className="text-xs text-gray-500">24/7 Helpline</div>
                        </button>

                        {/* <button
                            onClick={() => setContactMethod('live-chat')}
                            className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                        >
                            <div className="font-semibold">💬 Live Chat</div>
                            <div className="text-sm text-gray-600">Chat with agent</div>
                            <div className="text-xs text-gray-500">Instant connection</div>
                        </button> */}

                        <button
                            onClick={() => window.open(`https://wa.me/91${import.meta.env.VITE_PHONE}`, '_blank')}
                            className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                        >
                            <div className="font-semibold">💚 WhatsApp</div>
                            <div className="text-sm text-gray-600">+91-{import.meta.env.VITE_PHONE}</div>
                            <div className="text-xs text-gray-500">Quick responses</div>
                        </button>
                    </div>

                    <button
                        onClick={() => setShowContactModal(false)}
                        className="w-full mt-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </>
    )
}

export default ContactModal
