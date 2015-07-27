package api;

import java.io.IOException;
import javax.servlet.http.*;

public class DefaultServlet extends HttpServlet {
	
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        resp.setContentType("text/plain");
        resp.getWriter().println("{ \"name\": \"World\" }");
    }
    
    
//    @Override
//    public void doGet(HttpServletRequest req, HttpServletResponse resp)
//        throws IOException {
//      if (req.getParameter("testing") == null) {
//        resp.setContentType("text/plain");
//        resp.getWriter().println("Hello, this is a testing servlet. \n\n");
//        Properties p = System.getProperties();
//        p.list(resp.getWriter());
//
//      } else {
//        UserService userService = UserServiceFactory.getUserService();
//        User currentUser = userService.getCurrentUser();
//
//        if (currentUser != null) {
//          resp.setContentType("text/plain");
//          resp.getWriter().println("Hello, " + currentUser.getNickname());
//        } else {
//          resp.sendRedirect(userService.createLoginURL(req.getRequestURI()));
//        }
//      }
//    }
}