'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

interface CookieConsentProps {
    translations: {
        description: string;
        accept: string;
        reject: string;
        settings: string;
        necessary: string;
        necessaryExplanation: string;
        analytics: string;
        analyticsExplanation: string;
        save: string;
    };
}

export const CookieConsent = ({ translations }: CookieConsentProps) => {
    const [showConsent, setShowConsent] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        necessary: true, // Always required
        analytics: false,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consentCookie = getCookie('cookie-consent');
        if (!consentCookie) {
            setShowConsent(true);
        } else {
            try {
                const savedPreferences = JSON.parse(consentCookie as string);
                setCookiePreferences(savedPreferences);
            } catch {
                setShowConsent(true);
            }
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
        };

        setCookiePreferences(allAccepted);
        setCookie('cookie-consent', JSON.stringify(allAccepted), { maxAge: 60 * 60 * 24 * 365 }); // 1 year
        setShowConsent(false);

        // If Google Analytics is enabled and the user accepted analytics cookies
        if (window && allAccepted.analytics) {
            // Enable GA tracking - this can be handled by updating/reloading Google Analytics
            window.location.reload();
        }
    };

    const handleReject = () => {
        const allRejected = {
            necessary: true,
            analytics: false,
        };

        setCookiePreferences(allRejected);
        setCookie('cookie-consent', JSON.stringify(allRejected), { maxAge: 60 * 60 * 24 * 365 }); // 1 year
        setShowConsent(false);
    };

    const handleSaveSettings = () => {
        setCookie('cookie-consent', JSON.stringify(cookiePreferences), { maxAge: 60 * 60 * 24 * 365 }); // 1 year
        setShowConsent(false);
        setShowSettings(false);

        // If Google Analytics is enabled and the user accepted analytics cookies
        if (window && cookiePreferences.analytics) {
            window.location.reload();
        }
    };

    const handleSettingsToggle = () => {
        setShowSettings(!showSettings);
    };

    const updatePreference = (key: keyof typeof cookiePreferences, value: boolean) => {
        setCookiePreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
                {!showSettings ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="mt-1 text-sm text-gray-600">{translations.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleSettingsToggle}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-bl-xl rounded-tr-xl hover:bg-gray-50"
                            >
                                {translations.settings}
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-tr-xl rounded-bl-xl hover:bg-gray-50"
                            >
                                {translations.reject}
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-4 py-2 text-sm bg-salongreen text-white rounded-tr-xl rounded-bl-xl"
                            >
                                {translations.accept}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-4">{translations.settings}</h3>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">{translations.necessary}</h4>
                                    <p className="text-sm text-gray-600">{translations.necessaryExplanation}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={cookiePreferences.necessary}
                                    disabled={true}
                                    className="h-5 w-5 text-salongreen bg-salongreen rounded-tr-lg rounded-bl-lg"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">{translations.analytics}</h4>
                                    <p className="text-sm text-gray-600">{translations.analyticsExplanation}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={cookiePreferences.analytics}
                                    onChange={(e) => updatePreference('analytics', e.target.checked)}
                                    className="h-5 w-5 text-salongreen rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleSaveSettings}
                                className="px-4 py-2 text-sm bg-salongreen rounded-tr-xl rounded-bl-xl text-white rounded"
                            >
                                {translations.save}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
