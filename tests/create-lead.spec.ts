import { test, expect } from '../support/fixtures';
import testData from '../testdata/test-data.json';

test('Attempt to create Lead with missing Last Name and verify validation error', { tag: ["@e2e","@regression","@lead","@P0","@create-lead-missing-last-name"] }, async ({ page, homePage, leadNewPage }) => {
  await test.step('Open — Navigate to Leads tab', async () => {
    await page.goto('/lightning/o/Lead/list');
  });
  await test.step("Click — 'New' button", async () => {
    await leadNewPage.clickNew();
  });
  await test.step('Fill — First Name input', async () => {
    await leadNewPage.fillFirstName('John');
  });
  await test.step('Fill — Company input', async () => {
    await leadNewPage.fillCompany('ABC Technologies');
  });
  await test.step("Click — 'Save' button", async () => {
    await leadNewPage.clickSaveEdit();
  });
  await test.step('Assert visible — Validation error alert', async () => {
    await leadNewPage.expectThisItemDoesnTSupportVisible();
  });
  await test.step('Assert contains — Validation error mentions Last Name', async () => {
    await leadNewPage.expectThisItemDoesnTSupportContainsText('Last Name');
  });
});

test('Attempt to create Lead with missing Company and verify validation error', { tag: ["@e2e","@regression","@lead","@P0","@create-lead-missing-company"] }, async ({ page, homePage, leadNewPage }) => {
  await test.step('Open — Navigate to Leads tab', async () => {
    await page.goto('/lightning/o/Lead/list');
  });
  await test.step("Click — 'New' button", async () => {
    await leadNewPage.clickNew();
  });
  await test.step('Fill — First Name input', async () => {
    await leadNewPage.fillFirstName('John');
  });
  await test.step('Fill — Last Name input', async () => {
    await leadNewPage.fillLastName('Smith');
  });
  await test.step("Click — 'Save' button", async () => {
    await leadNewPage.clickSaveEdit();
  });
  await test.step('Assert visible — Validation error alert', async () => {
    await leadNewPage.expectThisItemDoesnTSupportVisible();
  });
  await test.step('Assert contains — Validation error mentions Company', async () => {
    await leadNewPage.expectThisItemDoesnTSupportContainsText('Company');
  });
});

test("Verify Lead Status is set to 'Open - Not Contacted' after creation", { tag: ["@e2e","@regression","@lead","@P1","@create-lead-default-status"] }, async ({ page, homePage, leadNewPage }) => {
  await test.step('Open — Navigate to Leads tab', async () => {
    await page.goto('/lightning/o/Lead/list');
  });
  await test.step("Click — 'New' button", async () => {
    await leadNewPage.clickNew();
  });
  await test.step('Fill — Last Name input', async () => {
    await leadNewPage.fillLastName('Smith');
  });
  await test.step('Fill — Company input', async () => {
    await leadNewPage.fillCompany('ABC Technologies');
  });
  await test.step("Click — 'Save' button", async () => {
    await leadNewPage.clickSaveEdit();
  });
  await test.step("Assert text — Lead Status is 'Open - Not Contacted'", async () => {
    await leadNewPage.expectLeadStatusText('Open - Not Contacted');
  });
});

test('Verify user is redirected to Lead record page after successful creation', { tag: ["@e2e","@regression","@lead","@P1","@create-lead-redirect-record-page"] }, async ({ page, homePage, leadNewPage }) => {
  await test.step('Open — Navigate to Leads tab', async () => {
    await page.goto('/lightning/o/Lead/list');
  });
  await test.step("Click — 'New' button", async () => {
    await leadNewPage.clickNew();
  });
  await test.step('Fill — Last Name input', async () => {
    await leadNewPage.fillLastName('Smith');
  });
  await test.step('Fill — Company input', async () => {
    await leadNewPage.fillCompany('ABC Technologies');
  });
  await test.step("Click — 'Save' button", async () => {
    await leadNewPage.clickSaveEdit();
  });
  await test.step('Assert visible — Lead record page main article', async () => {
    await leadNewPage.expectLeadInformationVisible();
  });
  await test.step('Assert contains — Lead Last Name in header', async () => {
    await leadNewPage.expectNewLeadContainsText('Smith');
  });
});
