import React from "react";
import styled from "styled-components";
import { ColumnWrapper } from "../../../reusable/styled-components";
import { Icon } from "@blueprintjs/core";

const KeyFeaturesSection = () => {
  return (
    <KeyFeaturesWrapper>
      <SectionHeader>
        <h1>
          Environment monitoring analytics for every stage of mushroom
          cultivation
        </h1>
      </SectionHeader>
      <KeyFeatures>
        <KeyFeature>
          <Icon icon="temperature" size={60} color={"#ccd0d9"} />
          <h2>Temperature</h2>
          <p>
            Sensors track temperatures in sterilization vessels, grow chambers,
            laboratories, and incubation rooms, ensuring each area is maintained
            at the optimal temperature for different growth stages.
          </p>
        </KeyFeature>
        <KeyFeature>
          <Icon icon="wind" size={60} color={"#ccd0d9"} />
          <h2>Particulate Matter (PM2.5)</h2>
          <p>
            Specialized sensors assess the air quality in lab rooms, crucial for
            maintaining a sterile environment and preventing contamination.
          </p>
        </KeyFeature>
        <KeyFeature>
          <Icon icon="dashboard" size={60} color={"#ccd0d9"} />
          <h2>CO2 Level</h2>
          <p>
            Sensors measure parts per million (ppm) of CO2 in grow chambers and
            other facility areas, essential for maintaining the right balance
            for mushroom growth.
          </p>
        </KeyFeature>
        <KeyFeature>
          <Icon icon="modal" size={60} color={"#ccd0d9"} />
          <h2>Customizable UI</h2>
          <p>
            The user interface of MycoTex is highly customizable, allowing
            facility managers to tailor the dashboard to their specific needs.
            Users can set thresholds for alerts, view real-time data, and access
            historical data for trend analysis.
          </p>
        </KeyFeature>
        <KeyFeature>
          <Icon icon="timeline-bar-chart" size={60} color={"#ccd0d9"} />
          <h2>Live and Historical Analysis</h2>
          <p>
            MycoTex offers both real-time monitoring and access to historical
            data. This dual approach enables users to respond swiftly to any
            immediate environmental changes and also to analyze long-term trends
            for continuous improvement of their cultivation practices.
          </p>
        </KeyFeature>
        <KeyFeature>
          <Icon icon="wrench" size={60} color={"#ccd0d9"} />
          <h2>Support and Maintenance</h2>
          <p>
            MycoTex comes with a dedicated support team for installation,
            training, and ongoing maintenance, ensuring that the system operates
            efficiently and reliably.
          </p>
        </KeyFeature>
      </KeyFeatures>
    </KeyFeaturesWrapper>
  );
};

export default KeyFeaturesSection;

const KeyFeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  border-radius: ${(props) => props.theme.other.borderRadius};
  /* box-shadow: ${(props) => props.theme.other.boxShadow}; */
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
  row-gap: 20px;
  @media screen and (max-width: 700px) {
    padding: 50px 20px;
  }
`;

const SectionHeader = styled.header`
  display: flex;
  text-align: center;
  justify-content: center;
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.colors.grey};
  }
`;

const KeyFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
`;

const KeyFeature = styled(ColumnWrapper)`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.highlight3};
  border-radius: ${(props) => props.theme.other.borderRadius};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  text-align: center;
  row-gap: 10px;
  transition: filter 0.3s ease-in-out;
  h2 {
    font-size: 25px;
    color: ${(props) => props.theme.colors.highlight1};
  }
  p {
    color: ${(props) => props.theme.colors.darkerGrey};
  }
  :hover {
    filter: brightness(110%);
  }
`;
