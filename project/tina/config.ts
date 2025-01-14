import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "t";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // Schema definition
  schema: {
    collections: [
      {
        name: "products",
        label: "Products",
        path: "public/products",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            ui: {
              component: "select",
            },
            options: [
              { value: "flower", label: "Flower" },
              { value: "edible", label: "Edible" },
              { value: "oil", label: "Oil" },
              { value: "vape", label: "Vape" },
            ],
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            ui: {
              component: "select",
            },
            options: [
              { value: "indica", label: "Indica" },
              { value: "sativa", label: "Sativa" },
              { value: "hybrid", label: "Hybrid" },
            ],
          },
          {
            type: "number",
            name: "thc",
            label: "THC",
          },
          {
            type: "number",
            name: "cbd",
            label: "CBD",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "object",
            name: "effects",
            label: "Effects",
            list: true,
            ui: {
              defaultItem: () => ({
                effect: "",
              }),
              itemProps: (item) => ({
                label: item?.effect || "Select an Effect",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "effect",
                label: "Select Effect",
                collections: ["effects"], // Reference to the "effects" collection
              },
            ],
          },
          {
            type: "object",
            name: "terpenes",
            label: "Terpenes",
            list: true,
            ui: {
              defaultItem: () => ({
                terpene: "",
              }),
              itemProps: (item) => ({
                label: item?.terpene || "Select a Terpene",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "terpene",
                label: "Select Terpene",
                collections: ["terpenes"], // Reference to the "terpenes" collection
              },
            ],
          },
        ],
      },
      {
        name: "effects",
        label: "Effects",
        path: "public/effects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
        ],
      },
      {
        name: "terpenes",
        label: "Terpenes",
        path: "public/terpenes",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
        ],
      },
      {
        name: "retailers",
        label: "Retailers",
        path: "public/retailers",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "address",
            label: "Address",
          },
        ],
      },
      {
        name: "lab_results",
        label: "Lab Results",
        path: "public/lab-results",
        fields: [
          {
            type: "string",
            name: "batch_number",
            label: "Batch Number",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "strain",
            label: "Strain",
          },
          {
            type: "number",
            name: "thc",
            label: "THC",
          },
          {
            type: "number",
            name: "cbd",
            label: "CBD",
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
          },
          {
            type: "string",
            name: "lab",
            label: "Lab",
          },
          {
            type: "string",
            name: "pdf",
            label: "PDF Report",
            ui: {
              component: "file",
            },
          },
        ],
      },
          ],
  },
});