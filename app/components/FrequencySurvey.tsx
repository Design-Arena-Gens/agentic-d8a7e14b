'use client';

import { useMemo, useState } from 'react';

type Frequency =
  | 'Several times a day'
  | 'About once a day'
  | 'A few times a week'
  | 'About once a week'
  | 'About once a month or less often'
  | 'I do not have an account or do not use';

type Activity = {
  id: string;
  label: string;
};

const frequencies: Frequency[] = [
  'Several times a day',
  'About once a day',
  'A few times a week',
  'About once a week',
  'About once a month or less often',
  'I do not have an account or do not use'
];

const activities: Activity[] = [
  { id: 'gotham-star', label: 'Read the Gotham Star' },
  { id: 'amazon', label: 'Use Amazon.com' },
  { id: 'instagram', label: 'Use Instagram' },
  { id: 'tiktok', label: 'Use Tik Tok' },
  { id: 'facebook', label: 'Use Facebook' },
  { id: 'bluesky', label: 'Use Bluesky' },
  { id: 'youtube', label: 'Use YouTube' },
  { id: 'nbc', label: 'Use NBC' },
  { id: 'washington-post', label: 'Use The Washington Post' },
  { id: 'whatsapp', label: 'Use WhatsApp' },
  { id: 'pinterest', label: 'Use Pinterest' },
  { id: 'threads', label: 'Use Threads' },
  { id: 'telemundo', label: 'Use Telemundo' },
  { id: 'twitter', label: 'Use X.com (Formerly Twitter)' },
  { id: 'google', label: 'Use Google' },
  { id: 'univision', label: 'Use Univision' },
  { id: 'chatgpt', label: 'Use ChatGPT' },
  { id: 'snapchat', label: 'Use Snapchat' },
  { id: 'pawnee-dispatch', label: 'Read the Pawnee Dispatch' }
];

const buildInitialResponses = () =>
  activities.reduce<Record<string, Frequency | null>>((acc, activity) => {
    acc[activity.id] = null;
    return acc;
  }, {});

const FrequencySurvey = () => {
  const [responses, setResponses] = useState<Record<string, Frequency | null>>(
    buildInitialResponses
  );

  const completion = useMemo(() => {
    const answered = Object.values(responses).filter(Boolean).length;
    return {
      answered,
      total: activities.length,
      percent: Math.round((answered / activities.length) * 100)
    };
  }, [responses]);

  const summary = useMemo(() => {
    const counts = frequencies.reduce<Record<Frequency, number>>((acc, freq) => {
      acc[freq] = 0;
      return acc;
    }, Object.create(null));

    for (const value of Object.values(responses)) {
      if (value) {
        counts[value] += 1;
      }
    }

    return counts;
  }, [responses]);

  const handleSelect = (activityId: string, value: Frequency) => {
    setResponses((prev) => ({ ...prev, [activityId]: value }));
  };

  return (
    <div className="survey-wrapper">
      <section className="intro">
        <h1>Media & Platform Usage Frequency</h1>
        <p>
          Select how often you engage with each outlet or platform. Choose one option per
          row. Your responses are saved locally and never leave this page.
        </p>
        <div className="progress" aria-live="polite">
          <span className="progress-label">Completion</span>
          <div className="progress-bar" role="progressbar" aria-valuenow={completion.percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${completion.percent}%` }} />
          </div>
          <span className="progress-count">
            {completion.answered} of {completion.total} answered
          </span>
        </div>
      </section>

      <section className="table-container" aria-label="Frequency survey">
        <table>
          <thead>
            <tr>
              <th scope="col">Activity</th>
              {frequencies.map((frequency) => (
                <th key={frequency} scope="col">
                  {frequency}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <th scope="row">{activity.label}</th>
                {frequencies.map((frequency) => {
                  const inputId = `${activity.id}-${frequency}`;
                  return (
                    <td key={frequency}>
                      <label htmlFor={inputId} className={responses[activity.id] === frequency ? 'selected' : undefined}>
                        <input
                          id={inputId}
                          type="radio"
                          name={activity.id}
                          value={frequency}
                          checked={responses[activity.id] === frequency}
                          onChange={() => handleSelect(activity.id, frequency)}
                        />
                        <span className="radio-label">{frequency}</span>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="summary" aria-live="polite">
        <h2>Response Snapshot</h2>
        <ul>
          {frequencies.map((frequency) => (
            <li key={frequency}>
              <span className="summary-label">{frequency}</span>
              <span className="summary-value">{summary[frequency]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FrequencySurvey;
