import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import '@tylertech/forge-ai/ai-disclaimer';

const storyStyles = html`<style>
  .disclaimer-story-host {
    inline-size: 500px;
    block-size: 600px;
  }
  .disclaimer-story-icon {
    color: var(--forge-theme-primary);
  }
</style>`;

const meta: Meta = {
  title: 'Components/Chat/Disclaimer',
  component: 'forge-ai-disclaimer',
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['forge-ai-disclaimer-agree', 'forge-ai-disclaimer-disagree']
    }
  }
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: () => html`
    ${storyStyles}
    <div class="disclaimer-story-host">
      <forge-ai-disclaimer @forge-ai-disclaimer-agree=${action('agree')} @forge-ai-disclaimer-disagree=${action('disagree')}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="disclaimer-story-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <h2>Terms of Service</h2>
        <p>By using this AI assistant, you agree to our terms of service. This assistant is provided as-is without warranties of any kind.</p>
        <p>Your interactions may be used to improve the service. Please do not share sensitive or personal information.</p>
        <p>The AI assistant may produce inaccurate or inappropriate content. Always verify important information from reliable sources.</p>
      </forge-ai-disclaimer>
    </div>
  `
};

export const CustomButtonText: Story = {
  render: () => html`
    ${storyStyles}
    <div class="disclaimer-story-host">
      <forge-ai-disclaimer @forge-ai-disclaimer-agree=${action('accept')} @forge-ai-disclaimer-disagree=${action('decline')}>
        <span slot="disagree-button-text">Decline</span>
        <span slot="agree-button-text">Accept</span>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="disclaimer-story-icon">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
        </svg>
        <h2>Cookie Policy</h2>
        <p>We use cookies to enhance your experience and analyze site usage.</p>
        <p>By accepting, you consent to our use of cookies as described in our privacy policy.</p>
      </forge-ai-disclaimer>
    </div>
  `
};

export const LongContent: Story = {
  render: () => html`
    ${storyStyles}
    <div class="disclaimer-story-host">
      <forge-ai-disclaimer @forge-ai-disclaimer-agree=${action('agree')} @forge-ai-disclaimer-disagree=${action('disagree')}>
        <h2>Privacy Policy</h2>
        <p>This privacy policy describes how we collect, use, and protect your personal information when you use our AI assistant service.</p>
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us, including your conversations with the AI assistant. This information is used to:</p>
        <ul>
          <li>Provide and improve the service</li>
          <li>Train and refine our AI models</li>
          <li>Ensure compliance with our terms of service</li>
          <li>Protect against misuse and abuse</li>
        </ul>
        <h3>How We Use Your Information</h3>
        <p>
          Your conversations may be analyzed by our systems and human reviewers to improve service quality. We take steps to protect your privacy, but cannot
          guarantee complete anonymity.
        </p>
        <h3>Data Retention</h3>
        <p>We retain conversation data for up to 30 days for operational purposes. After this period, data may be anonymized and used for training purposes.</p>
        <h3>Your Rights</h3>
        <p>You have the right to request access to your data, request deletion, or opt out of certain uses. Contact us for more information.</p>
        <h3>Changes to This Policy</h3>
        <p>We may update this policy from time to time. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
      </forge-ai-disclaimer>
    </div>
  `
};

export const NoIcon: Story = {
  render: () => html`
    ${storyStyles}
    <div class="disclaimer-story-host">
      <forge-ai-disclaimer @forge-ai-disclaimer-agree=${action('agree')} @forge-ai-disclaimer-disagree=${action('disagree')}>
        <h2>Important Notice</h2>
        <p>Please read and acknowledge this notice before proceeding.</p>
        <p>By clicking Agree, you confirm that you understand and accept the terms outlined above.</p>
      </forge-ai-disclaimer>
    </div>
  `
};
