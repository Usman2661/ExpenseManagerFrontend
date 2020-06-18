export const ALL_COMPANIES = `
  query allCompanies {
    allCompanies {
        id
        name
        addressFirstLine
        addressSecondLine
        addressThirdLine
        postcode
        businessArea
        phone
        registerYear
    }
  }
`;

export const COMPANY = `query company($id: Int!) {
  company(id: $id) {
    id
    name
    addressFirstLine
    addressSecondLine
    addressThirdLine
    postcode
    businessArea
    phone
    registerYear
  }
}`;
