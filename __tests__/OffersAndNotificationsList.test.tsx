import OffersAndNotificationsList from "@/app-example/components/ui/profile/notifications/notificationsList";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

describe("OffersAndNotificationsList", () => {
  it("renders offers tab by default", async () => {
    const { getByText } = render(<OffersAndNotificationsList />);

    await waitFor(() => {
      expect(getByText("MyBeauty")).toBeTruthy();
      expect(getByText(/плаття/i)).toBeTruthy();
    });
  });

  it("switches to notifications tab when tapped", async () => {
    const { getByText } = render(<OffersAndNotificationsList />);

    fireEvent.press(getByText("Сповіщення"));

    await waitFor(() => {
      expect(getByText("До -50% на преміумаксесуари")).toBeTruthy();
    });
  });
});
