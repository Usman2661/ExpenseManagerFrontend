import gql from 'graphql-tag';

export const CREATE_COMPANY = `
  mutation createCompany(
    $name: String!
    $addressFirstLine: String!
    $addressSecondLine: String
    $addressThirdLine: String
    $postcode: String!
    $businessArea: String!
    $phone: String!
    $registerYear: Int!
  ) {
    createCompany(
      name: $name
      addressFirstLine: $addressFirstLine
      addressSecondLine: $addressSecondLine
      addressThirdLine: $addressThirdLine
      postcode: $postcode
      businessArea: $businessArea
      phone: $phone
      registerYear: $registerYear
    ) {
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

export const DELETE_COMPANY = `
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

export const UPDATE_COMPANY = `
  mutation updateCompany(
    $id: Int!
    $name: String!
    $addressFirstLine: String!
    $addressSecondLine: String
    $addressThirdLine: String
    $postcode: String!
    $businessArea: String!
    $phone: String!
    $registerYear: Int!
  ) {
    updateCompany(
      id: $id
      name: $name
      addressFirstLine: $addressFirstLine
      addressSecondLine: $addressSecondLine
      addressThirdLine: $addressThirdLine
      postcode: $postcode
      businessArea: $businessArea
      phone: $phone
      registerYear: $registerYear
    ) {
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

export const CREATE_COMPANYCONFIG = `
  mutation createCompanyConfig(
    $logo: String
    $appBarColor: String
  ) {
    createCompanyConfig(
      logo: $logo
      appBarColor: $appBarColor
    ) {
      id
      logo, 
      appBarColor, 
      companyId
    }
  }
`;

export const UPDATE_COMPANYCONFIG = `
  mutation updateCompanyConfig(
    $id: Int!
    $logo: String
    $appBarColor: String
  ) {
    updateCompanyConfig(
      id: $id
      logo: $logo
      appBarColor: $appBarColor
    ) {
      id
      logo, 
      appBarColor, 
      companyId
    }
  }
`;
