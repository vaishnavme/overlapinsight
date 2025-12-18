import { Text } from "@/components/ui/text";
import SEO from "@/components/ui/seo";

const Home = () => (
  <>
    <SEO />

    <div className="bg-muted w-full lg:h-[calc(100vh-48px)] px-4 md:px-10 py-6 mx-auto space-y-8">
      {/* Hero Section */}
      <div className="space-y-4 text-center">
        <Text xxl className="font-serif" medium>
          Mutual Fund Overlap Calculator
        </Text>
        <Text className="text-muted-foreground max-w-2xl mx-auto">
          Discover hidden overlaps in your mutual fund portfolio and make
          smarter investment decisions.
        </Text>
      </div>

      {/* Content */}
      <div className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="space-y-4">
          <Text medium className="font-serif" render={<h2 />}>
            Why Use This Tool?
          </Text>
          <Text sm className="leading-relaxed text-muted-foreground">
            Many investors unknowingly hold multiple mutual funds with similar
            stock holdings, creating concentration risk instead of true
            diversification. Our overlap calculator reveals these hidden
            overlaps, helping you optimize your portfolio for better risk
            management and cost efficiency.
          </Text>
        </div>

        {/* Key Benefits */}
        <div className="space-y-4">
          <Text medium className="font-serif" render={<h2 />}>
            Key Benefits
          </Text>

          <div className="grid gap-4">
            <div className="flex flex-col">
              <Text sm medium>
                True Diversification
              </Text>
              <Text sm className="text-muted-foreground">
                Identify overlapping stocks to avoid the illusion of
                diversification.
              </Text>
            </div>

            <div className="flex flex-col">
              <Text sm medium>
                Cost Optimization
              </Text>
              <Text sm className="text-muted-foreground">
                Eliminate redundant funds and reduce unnecessary expense ratios.
              </Text>
            </div>

            <div className="flex flex-col">
              <Text sm medium>
                Risk Management
              </Text>
              <Text sm className="text-muted-foreground">
                Reduce concentration risk from common stock holdings.
              </Text>
            </div>

            <div className="flex flex-col">
              <Text sm medium>
                Smart Analysis
              </Text>
              <Text sm className="text-muted-foreground">
                Get instant insights that would take hours to analyze manually.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Home.displayName = "HomePage";

export default Home;
