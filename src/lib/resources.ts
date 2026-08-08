import { prisma } from "./db";
import type { CrudConfig } from "./crud";

function num(data: Record<string, unknown>, key: string): number {
  const value = data[key];
  return typeof value === "number" ? value : 0;
}

export const incomeResource: CrudConfig = {
  delegate: prisma.financeIncome,
  codeField: "incomeCode",
  codePrefix: "BM-INC",
  orderBy: { incomeDate: "desc" },
  required: ["incomeTitle", "incomeSource", "amount", "incomeDate"],
  fields: {
    incomeTitle: "string",
    incomeSource: "string",
    clientId: "string",
    songId: "string",
    platformId: "string",
    amount: "number",
    gstAmount: "number",
    tdsAmount: "number",
    currency: "string",
    incomeDate: "date",
    receivedDate: "date",
    paymentMode: "string",
    accountId: "string",
    transactionId: "string",
    referenceNumber: "string",
    status: "string",
    notes: "string",
  },
  derive: (data) => ({
    netAmount: num(data, "amount") + num(data, "gstAmount") - num(data, "tdsAmount"),
  }),
};

export const expenseResource: CrudConfig = {
  delegate: prisma.financeExpense,
  codeField: "expenseCode",
  codePrefix: "BM-EXP",
  orderBy: { expenseDate: "desc" },
  required: ["expenseTitle", "expenseCategory", "amount", "expenseDate"],
  fields: {
    expenseTitle: "string",
    expenseCategory: "string",
    vendorId: "string",
    artistId: "string",
    studioId: "string",
    songId: "string",
    amount: "number",
    gstAmount: "number",
    tdsAmount: "number",
    expenseDate: "date",
    paidDate: "date",
    paymentMode: "string",
    accountId: "string",
    billNumber: "string",
    invoiceNumber: "string",
    referenceNumber: "string",
    approvalStatus: "string",
    paymentStatus: "string",
    notes: "string",
  },
  derive: (data) => ({
    netAmount: num(data, "amount") + num(data, "gstAmount") - num(data, "tdsAmount"),
  }),
};

export const invoiceResource: CrudConfig = {
  delegate: prisma.financeInvoice,
  codeField: "invoiceNumber",
  codePrefix: "BM-INV",
  orderBy: { invoiceDate: "desc" },
  include: { items: true },
  required: ["invoiceType", "invoiceDate", "subtotal"],
  fields: {
    invoiceType: "string",
    clientId: "string",
    invoiceDate: "date",
    dueDate: "date",
    placeOfSupply: "string",
    subtotal: "number",
    discountAmount: "number",
    cgstAmount: "number",
    sgstAmount: "number",
    igstAmount: "number",
    paidAmount: "number",
    status: "string",
  },
  derive: (data) => {
    const taxableAmount = num(data, "subtotal") - num(data, "discountAmount");
    const totalGst =
      num(data, "cgstAmount") + num(data, "sgstAmount") + num(data, "igstAmount");
    const grandTotal = taxableAmount + totalGst;
    return {
      taxableAmount,
      totalGst,
      grandTotal,
      balanceAmount: grandTotal - num(data, "paidAmount"),
    };
  },
};

export const receiptResource: CrudConfig = {
  delegate: prisma.financeReceipt,
  codeField: "receiptNumber",
  codePrefix: "BM-RCP",
  orderBy: { receiptDate: "desc" },
  required: ["receiptDate", "amountReceived"],
  fields: {
    clientId: "string",
    invoiceId: "string",
    receiptDate: "date",
    amountReceived: "number",
    paymentMode: "string",
    accountId: "string",
    transactionId: "string",
    balanceAmount: "number",
    purpose: "string",
  },
};

export const paymentResource: CrudConfig = {
  delegate: prisma.financePayment,
  codeField: "paymentCode",
  codePrefix: "BM-PAY",
  required: ["paymentType", "payeeType", "grossAmount"],
  fields: {
    paymentType: "string",
    payeeType: "string",
    payeeId: "string",
    songId: "string",
    agreementId: "string",
    grossAmount: "number",
    tdsAmount: "number",
    gstAmount: "number",
    paidAmount: "number",
    dueDate: "date",
    paidDate: "date",
    paymentMode: "string",
    accountId: "string",
    status: "string",
  },
  derive: (data) => {
    const netAmount =
      num(data, "grossAmount") + num(data, "gstAmount") - num(data, "tdsAmount");
    return { netAmount, pendingAmount: netAmount - num(data, "paidAmount") };
  },
};

export const accountResource: CrudConfig = {
  delegate: prisma.financeAccount,
  required: ["accountType", "accountName"],
  fields: {
    accountType: "string",
    accountName: "string",
    bankName: "string",
    accountNumber: "string",
    ifscCode: "string",
    upiId: "string",
    walletProvider: "string",
    openingBalance: "number",
    currentBalance: "number",
    currency: "string",
    status: "string",
  },
  derive: (data) => ({
    currentBalance:
      data.currentBalance === undefined || data.currentBalance === null
        ? num(data, "openingBalance")
        : data.currentBalance,
    openingBalance: num(data, "openingBalance"),
  }),
};

export const gstResource: CrudConfig = {
  delegate: prisma.financeGstEntry,
  ownerField: null,
  required: ["entryType", "taxableAmount"],
  fields: {
    entryType: "string",
    sourceModule: "string",
    sourceId: "string",
    gstType: "string",
    taxableAmount: "number",
    cgstRate: "number",
    cgstAmount: "number",
    sgstRate: "number",
    sgstAmount: "number",
    igstRate: "number",
    igstAmount: "number",
    gstMonth: "int",
    gstYear: "int",
    status: "string",
  },
  derive: (data) => ({
    totalGst:
      num(data, "cgstAmount") + num(data, "sgstAmount") + num(data, "igstAmount"),
  }),
};

export const copyrightAssetResource: CrudConfig = {
  delegate: prisma.copyrightAsset,
  codeField: "assetCode",
  codePrefix: "BM-CRA",
  required: ["assetTitle", "assetType"],
  fields: {
    assetTitle: "string",
    assetType: "string",
    alternateTitles: "stringArray",
    language: "string",
    genre: "string",
    subGenre: "string",
    duration: "int",
    isrcCode: "string",
    upcCode: "string",
    youtubeVideoId: "string",
    releaseDate: "date",
    creationDate: "date",
    recordingDate: "date",
    labelName: "string",
    producerName: "string",
    primaryArtistId: "string",
    songId: "string",
    ownershipStatus: "string",
    copyrightStatus: "string",
  },
};

export const copyrightCaseResource: CrudConfig = {
  delegate: prisma.copyrightCase,
  codeField: "caseCode",
  codePrefix: "BM-CASE",
  required: ["caseTitle", "caseType"],
  fields: {
    caseTitle: "string",
    caseType: "string",
    assetId: "string",
    originalUrl: "string",
    infringingUrl: "string",
    platform: "string",
    infringerName: "string",
    infringerChannelId: "string",
    infringerEmail: "string",
    caseDescription: "string",
    priority: "string",
    status: "string",
    assignedToId: "string",
    nextActionDueAt: "date",
  },
};

export const copyrightClaimResource: CrudConfig = {
  delegate: prisma.copyrightClaim,
  ownerField: "submittedById",
  required: ["claimType"],
  fields: {
    caseId: "string",
    assetId: "string",
    claimType: "string",
    platform: "string",
    claimReferenceId: "string",
    targetUrl: "string",
    targetVideoId: "string",
    targetChannelId: "string",
    claimAction: "string",
    claimReason: "string",
    claimText: "string",
    submittedAt: "date",
    responseStatus: "string",
    platformDecision: "string",
    decisionReason: "string",
    nextAction: "string",
  },
};

export const dmcaResource: CrudConfig = {
  delegate: prisma.dmcaNotice,
  ownerField: null,
  codeField: "noticeCode",
  codePrefix: "BM-DMCA",
  required: ["noticeSubject"],
  fields: {
    caseId: "string",
    assetId: "string",
    platform: "string",
    recipientName: "string",
    recipientEmail: "string",
    recipientAddress: "string",
    copyrightOwnerName: "string",
    authorizedPersonName: "string",
    noticeSubject: "string",
    noticeBody: "string",
    originalWorkDescription: "string",
    originalWorkUrl: "string",
    infringingWorkUrl: "string",
    goodFaithStatement: "string",
    accuracyStatement: "string",
    signatureName: "string",
    signatureDate: "date",
    status: "string",
  },
};

export const evidenceResource: CrudConfig = {
  delegate: prisma.copyrightEvidence,
  ownerField: "uploadedById",
  required: ["evidenceTitle", "evidenceType"],
  fields: {
    assetId: "string",
    caseId: "string",
    claimId: "string",
    evidenceType: "string",
    evidenceTitle: "string",
    description: "string",
    fileId: "string",
    sourceUrl: "string",
    platform: "string",
    capturedAt: "date",
    hashValue: "string",
    isPrimaryEvidence: "boolean",
    verificationStatus: "string",
    legalWeight: "string",
  },
};

export const copyrightRightResource: CrudConfig = {
  delegate: prisma.copyrightRight,
  ownerField: null,
  required: ["assetId", "rightType", "rightOwnerType"],
  fields: {
    assetId: "string",
    rightType: "string",
    rightOwnerType: "string",
    rightOwnerId: "string",
    ownershipPercentage: "number",
    territory: "string",
    startDate: "date",
    endDate: "date",
    isExclusive: "boolean",
    isTransferable: "boolean",
    isSubLicensable: "boolean",
    revenueSharePercentage: "number",
    agreementId: "string",
    status: "string",
  },
};

export const agreementResource: CrudConfig = {
  delegate: prisma.copyrightAgreement,
  codeField: "agreementCode",
  codePrefix: "BM-AGR",
  required: ["agreementTitle", "agreementType"],
  fields: {
    agreementType: "string",
    agreementTitle: "string",
    assetId: "string",
    songId: "string",
    partyId: "string",
    agreementDate: "date",
    effectiveDate: "date",
    expiryDate: "date",
    territory: "string",
    rightsAssigned: "stringArray",
    revenueShare: "number",
    paymentTerms: "string",
    documentFileId: "string",
    signedStatus: "string",
    legalReviewStatus: "string",
  },
};

export const aiMatchResource: CrudConfig = {
  delegate: prisma.copyrightAiMatch,
  ownerField: null,
  required: ["matchType"],
  fields: {
    assetId: "string",
    sourceAssetId: "string",
    matchedUrl: "string",
    matchedPlatform: "string",
    matchType: "string",
    matchScore: "number",
    audioSimilarityScore: "number",
    lyricsSimilarityScore: "number",
    titleSimilarityScore: "number",
    aiSummary: "string",
    riskLevel: "string",
    recommendedAction: "string",
    reviewStatus: "string",
  },
};

export const taskResource: CrudConfig = {
  delegate: prisma.task,
  orderBy: { createdAt: "desc" },
  include: { assignedTo: { select: { name: true } } },
  required: ["title"],
  fields: {
    title: "string",
    description: "string",
    assignedToId: "string",
    relatedType: "string",
    relatedId: "string",
    priority: "string",
    status: "string",
    dueDate: "date",
    reminderDate: "date",
  },
};

export const assetLibraryResource: CrudConfig = {
  delegate: prisma.asset,
  ownerField: "uploadedById",
  required: ["assetName", "assetType", "fileUrl"],
  fields: {
    assetName: "string",
    assetType: "string",
    category: "string",
    tags: "stringArray",
    fileUrl: "string",
    previewUrl: "string",
    licenseStatus: "string",
    usageRights: "string",
  },
};

export const studioSessionResource: CrudConfig = {
  delegate: prisma.studioSession,
  codeField: "sessionCode",
  codePrefix: "BM-STU",
  orderBy: { sessionDate: "desc" },
  required: ["studioName", "sessionDate"],
  fields: {
    songId: "string",
    sessionType: "string",
    studioName: "string",
    studioCity: "string",
    engineerName: "string",
    sessionDate: "date",
    startTime: "string",
    endTime: "string",
    hours: "number",
    ratePerHour: "number",
    status: "string",
    notes: "string",
  },
  derive: (data) => ({
    totalCost: num(data, "hours") * num(data, "ratePerHour") || null,
  }),
};

export const videoShootResource: CrudConfig = {
  delegate: prisma.videoShoot,
  codeField: "shootCode",
  codePrefix: "BM-VID",
  orderBy: { shootDate: "desc" },
  required: ["shootTitle", "shootDate"],
  fields: {
    songId: "string",
    shootTitle: "string",
    shootType: "string",
    location: "string",
    city: "string",
    shootDate: "date",
    endDate: "date",
    directorName: "string",
    cameraTeam: "string",
    dancersCount: "int",
    budget: "number",
    actualCost: "number",
    status: "string",
    notes: "string",
  },
};

export const releaseResource: CrudConfig = {
  delegate: prisma.distributionRelease,
  codeField: "releaseCode",
  codePrefix: "BM-REL",
  required: ["releaseTitle"],
  fields: {
    songId: "string",
    releaseTitle: "string",
    distributor: "string",
    platforms: "stringArray",
    releaseDate: "date",
    liveDate: "date",
    isrc: "string",
    upc: "string",
    revenueShare: "number",
    status: "string",
    notes: "string",
  },
};

export const automationRuleResource: CrudConfig = {
  delegate: prisma.automationRule,
  required: ["ruleName", "triggerType", "actionType"],
  fields: {
    ruleName: "string",
    description: "string",
    triggerType: "string",
    triggerConfig: "string",
    actionType: "string",
    actionConfig: "string",
    isActive: "boolean",
  },
};
