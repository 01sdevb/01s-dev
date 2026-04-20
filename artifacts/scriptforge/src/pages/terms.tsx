import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().getFullYear()}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using 0.1s Dev, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Acceptable Use</h2>
            <p className="text-muted-foreground">
              You agree to use 0.1s Dev only for lawful purposes and in ways that do not infringe the rights of others. You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Upload malicious scripts designed to harm users or systems</li>
              <li>Share scripts that steal user data, credentials, or personal information</li>
              <li>Distribute malware, viruses, or any harmful code</li>
              <li>Upload scripts that violate any game's Terms of Service in a way that harms other players</li>
              <li>Impersonate other users or misrepresent your identity</li>
              <li>Spam or post duplicate content</li>
              <li>Harass, threaten, or abuse other community members</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Script Content Policy</h2>
            <p className="text-muted-foreground">
              All scripts uploaded to 0.1s Dev are publicly visible. You are solely responsible for the scripts you publish. We reserve the right to remove any script that violates these terms or that we deem harmful to the community.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Scripts must be accurately described and labeled</li>
              <li>You must own or have rights to publish any code you upload</li>
              <li>Scripts designed for educational or entertainment purposes are welcome</li>
              <li>We do not endorse or verify the safety of any user-uploaded script</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Account Responsibility</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              By uploading scripts to 0.1s Dev, you grant us a non-exclusive, royalty-free license to display and distribute your content on our platform. You retain ownership of your scripts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              0.1s Dev is provided "as is" without any warranties of any kind. We do not guarantee the accuracy, safety, or legality of scripts posted by users. Use any script at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, 0.1s Dev shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform or any scripts obtained from it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend accounts that violate these terms, at our sole discretion, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">10. Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms of Service, please reach out through the community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
