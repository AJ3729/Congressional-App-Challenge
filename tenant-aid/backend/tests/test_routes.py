import unittest
from app import app

class TestTenantAidRoutes(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_root(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        self.assertIn("message", res.json)

    def test_faq(self):
        res = self.client.get("/faq")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json, list)
        self.assertLessEqual(len(res.json), 5)

    def test_summary(self):
        text = "This is a long sample paragraph about tenant laws and renter protections in New York City."
        res = self.client.post("/summary", json={"text": text})
        self.assertEqual(res.status_code, 200)
        self.assertIn("summary", res.json)

if __name__ == "__main__":
    unittest.main()
